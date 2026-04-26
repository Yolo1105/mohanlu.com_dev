// app/api/chat/route.ts
//
// Vercel serverless route that proxies chat requests to the Anthropic
// Messages API. Holds the API key server-side, applies rate limiting,
// validates input, and streams responses back to the browser as SSE.
//
// Requires:
//   - ANTHROPIC_API_KEY in Vercel project env (Production scope)
//   - Optional: KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV) for
//     persistent rate limiting. Without these, falls back to in-memory
//     limiting which resets per cold start (still better than nothing).
//
// Frontend contract:
//   POST { message: string, history: [{role: 'user'|'assistant', content: string}] }
//   Returns SSE stream of `data: {"type":"text","text":"..."}` events,
//   ending with `data: {"type":"done"}`.

import Anthropic from '@anthropic-ai/sdk';

// Run on Edge for low latency. Streams natively.
export const runtime = 'edge';

// ── Rate limiting ────────────────────────────────────────────────────────
// Per-IP token bucket: 20 requests per hour. The window resets rolling.
//
// In-memory fallback works only within a single edge instance, so abuse
// can still slip through during scale-up. Vercel KV makes this consistent
// across all instances. Both code paths are here; KV is used if env vars
// are present.

const RATE_LIMIT_PER_HOUR = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

// In-memory store, fallback only
const memoryStore = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(ip: string): Promise<{ ok: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    // Vercel KV path (preferred)
    const key = `chat-rl:${ip}`;
    try {
      const incrRes = await fetch(`${kvUrl}/incr/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      const { result: count } = await incrRes.json();
      if (count === 1) {
        // First hit in this window — set TTL
        await fetch(`${kvUrl}/expire/${encodeURIComponent(key)}/${RATE_WINDOW_MS / 1000}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
      }
      const ttlRes = await fetch(`${kvUrl}/ttl/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      const { result: ttl } = await ttlRes.json();
      const resetAt = now + (ttl > 0 ? ttl * 1000 : RATE_WINDOW_MS);
      return {
        ok: count <= RATE_LIMIT_PER_HOUR,
        remaining: Math.max(0, RATE_LIMIT_PER_HOUR - count),
        resetAt,
      };
    } catch (e) {
      // Fall through to memory-based limiting on KV failure
    }
  }

  // In-memory fallback
  const entry = memoryStore.get(ip);
  if (!entry || entry.resetAt < now) {
    memoryStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_PER_HOUR - 1, resetAt: now + RATE_WINDOW_MS };
  }
  entry.count += 1;
  return {
    ok: entry.count <= RATE_LIMIT_PER_HOUR,
    remaining: Math.max(0, RATE_LIMIT_PER_HOUR - entry.count),
    resetAt: entry.resetAt,
  };
}

// ── Input validation ─────────────────────────────────────────────────────

const MAX_MESSAGE_LEN = 2000;
const MAX_HISTORY_MESSAGES = 20;

interface ChatRequest {
  message: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  systemPrompt?: string;
}

function validateRequest(body: unknown): { ok: true; data: ChatRequest } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'invalid body' };
  const b = body as any;
  if (typeof b.message !== 'string') return { ok: false, error: 'message must be a string' };
  if (b.message.length === 0) return { ok: false, error: 'message is empty' };
  if (b.message.length > MAX_MESSAGE_LEN) return { ok: false, error: `message too long (max ${MAX_MESSAGE_LEN} chars)` };
  if (b.history !== undefined && !Array.isArray(b.history)) return { ok: false, error: 'history must be an array' };
  const history = (b.history || []).slice(-MAX_HISTORY_MESSAGES);
  for (const m of history) {
    if (!m || typeof m !== 'object') return { ok: false, error: 'invalid history entry' };
    if (m.role !== 'user' && m.role !== 'assistant') return { ok: false, error: 'invalid role in history' };
    if (typeof m.content !== 'string') return { ok: false, error: 'history content must be string' };
  }
  return { ok: true, data: { message: b.message, history, systemPrompt: typeof b.systemPrompt === 'string' ? b.systemPrompt : undefined } };
}

// ── Handler ──────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'server not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Identify the visitor for rate limiting. Vercel forwards the original
  // client IP via `x-forwarded-for`. The first IP in the chain is the
  // user; the rest are proxies. Falls back to a fixed key if missing
  // (better than nothing — caps anonymous abuse at the bucket size).
  const fwd = req.headers.get('x-forwarded-for') || '';
  const ip = fwd.split(',')[0].trim() || 'unknown';

  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    return new Response(
      JSON.stringify({ error: 'rate limit exceeded', resetAt: rl.resetAt }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(RATE_LIMIT_PER_HOUR),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(rl.resetAt / 1000)),
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // Parse + validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const validation = validateRequest(body);
  if (!validation.ok) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { message, history, systemPrompt } = validation.data;

  // Call Anthropic with streaming. The `system` parameter holds the
  // grounding prompt; conversation `messages` holds the rolling history
  // capped to MAX_HISTORY_MESSAGES.
  const client = new Anthropic({ apiKey });

  const messages = [
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: message },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      try {
        const response = await client.messages.stream({
          model: 'claude-sonnet-4-5',
          max_tokens: 1024,
          system: systemPrompt || 'You are a helpful assistant.',
          messages,
        });

        for await (const chunk of response) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            send({ type: 'text', text: chunk.delta.text });
          }
        }
        send({ type: 'done' });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'upstream error';
        send({ type: 'error', error: msg });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-RateLimit-Limit': String(RATE_LIMIT_PER_HOUR),
      'X-RateLimit-Remaining': String(rl.remaining),
      'X-RateLimit-Reset': String(Math.floor(rl.resetAt / 1000)),
      'Connection': 'keep-alive',
    },
  });
}

# Security overview — mohanlu.com portfolio

## Architecture

This site is a single-page React application served as a static asset by
Vercel, plus optional Vercel serverless routes for the AI chat. There is
no application database, no user accounts, no session cookies, and no
server-rendered HTML containing user input.

## Threat model

| Asset                          | Threat                                  | Control                                                     |
| ------------------------------ | --------------------------------------- | ----------------------------------------------------------- |
| User browser tab               | XSS via injected content                | No `dangerouslySetInnerHTML`, no `eval`, all text via React |
| User browser tab               | ReDoS via search/grep regex             | Pattern length cap (200 chars) + 100ms wall-clock budget    |
| User browser tab               | Tab-nabbing on external links           | All `target="_blank"` links use `rel="noopener noreferrer"` |
| User browser tab               | Clickjacking                            | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`      |
| User browser tab               | Data exfiltration via injected resource | CSP `connect-src` allowlist                                 |
| Anthropic API key (when wired) | Client-side exposure                    | Key stored in Vercel env, accessed only from `/api/chat`    |
| Anthropic API key (when wired) | Abuse / billing                         | Rate limiting on `/api/chat` (Vercel KV or Upstash)         |
| Visitor IP (read-only)         | Logged or shared                        | Only displayed back to visitor, never sent to a server      |

## In-code defenses (already implemented)

- **No HTML injection sinks.** The codebase contains zero uses of
  `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, or
  `document.write`. All rendered content goes through React's JSX text
  interpolation, which automatically escapes.
- **External links hardened.** Every `<a target="_blank">` and every
  `window.open` call includes `rel="noopener noreferrer"` and the
  `noopener,noreferrer` window features string respectively.
- **ReDoS-safe regex helpers.** `compileSafeRegex(pattern, flags)` rejects
  patterns over 200 characters and wraps `new RegExp` in try/catch.
  `safeRegexFilter(re, lines, mapper)` enforces a 100ms wall-clock budget
  while iterating; on overrun it returns matches found so far plus a
  `partial: true` flag. Both helpers are used in the search panel and
  the terminal `grep` command.
- **Mock chat is closed-system.** Until `CHAT_CONFIG.useRealLLM = true`,
  responses are pure pattern matching against hardcoded copy. There is
  no dynamic code execution path.
- **Terminal isn't a real shell.** Commands dispatch via if/else on the
  first token. There is no `child_process`, no FS access, no eval. A
  user typing `rm -rf /` literally just gets a joke response.
- **localStorage failures are silent.** The visitor counter wraps reads
  and writes in try/catch and degrades to first-visit display when
  storage is blocked (private browsing, ad-blocker, strict CSP).

## Deployment-layer defenses (in `vercel.json`)

- **Content-Security-Policy** restricts script, style, font, image,
  connect, frame-ancestors, base-uri, form-action, and object sources.
  `script-src 'self'` only — no inline scripts. `style-src 'self'
  'unsafe-inline'` is required because the React component injects a
  `<style>` block for keyframes; this is acceptable because React
  doesn't expose a script-injection path through it.
- **HSTS** with 2-year max-age, `includeSubDomains`, `preload`.
- **X-Content-Type-Options: nosniff** prevents MIME sniffing.
- **X-Frame-Options: DENY** plus CSP `frame-ancestors 'none'` for
  defense in depth against clickjacking.
- **Referrer-Policy: strict-origin-when-cross-origin** sends only the
  origin (no path or query) on cross-origin navigations.
- **Permissions-Policy** disables camera, microphone, geolocation,
  payment, USB, sensors, and FLoC.
- **Cross-Origin-Opener-Policy: same-origin** isolates the browsing
  context group, mitigating Spectre-style attacks.
- **Cross-Origin-Resource-Policy: same-origin** prevents the document
  from being embedded as a resource by other origins.
- **API routes get `Cache-Control: no-store`** and a tight CORS
  allowlist (only the production origin).
- **Static assets get a 1-year immutable cache** for performance.

## Required ops setup before enabling live chat

If/when `CHAT_CONFIG.useRealLLM` is flipped to `true`:

1. **Create `/api/chat`** as a Vercel Edge or Node serverless function.
   It should accept a POST with `{ message, history }`, call the
   Anthropic Messages API server-side, and stream the response back.
2. **Set `ANTHROPIC_API_KEY`** in the Vercel project's environment
   variables (Production scope only). Never commit this to git.
3. **Add rate limiting.** Use Vercel KV or Upstash Redis with a per-IP
   token bucket (e.g. 20 messages per hour). Without this, abuse can
   drain credits.
4. **Add a daily cap on total spend.** Anthropic's dashboard supports
   spend alerts.
5. **Verify the CSP allows `/api/chat`.** Same-origin fetches are
   already allowed by `connect-src 'self'`.

## Out of scope

- Authentication (no login surface).
- PII storage (none collected; visitor IP is shown to the visitor only).
- Payment data (none).
- Cross-origin frame embedding (denied by policy).
- Service worker / offline (none).

## Reporting

Security concerns: open a GitHub issue or email the address shown in
the contact panel. There is no bug bounty.

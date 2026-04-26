# Deployment guide

End-to-end checklist for taking this from local dev to live at
mohanlu.com (or any domain) on Vercel.

## Prerequisites

- Node.js 18.17+ (`node --version`)
- A Vercel account (free tier works)
- An Anthropic API key from https://console.anthropic.com
- A custom domain (optional, Vercel gives you one for free)

## Step 1 — local dev

```bash
git clone <this-repo>
cd mohanlu-portfolio
npm install
cp .env.example .env.local
```

Edit `.env.local` and paste your Anthropic API key. Then:

```bash
npm run dev
# open http://localhost:3000
```

The chat runs in **mock mode** by default. To test the real LLM
locally, edit `app/components/Portfolio.jsx`:

```js
const CHAT_CONFIG = {
  useRealLLM: true,       // ← was false
  apiEndpoint: '/api/chat',
  model: 'claude-sonnet-4-5',
  systemPrompt: SYSTEM_PROMPT_ABOUT_MOHAN,
};
```

Restart `npm run dev`. Now `/api/chat` is hit on every chat send;
your local server proxies to Anthropic using the key from
`.env.local`.

## Step 2 — replace placeholder content

The site ships with placeholder bio + project content. Before going
live, replace these:

1. **`app/components/Portfolio.jsx` → `FILE_CONTENT` object** (top of
   file). Each key is a file path, each value has `kind` and `body`.
   Edit the `body` strings to match your real bio, projects, etc.

2. **`app/components/Portfolio.jsx` → `tree` constant** (a few lines
   below `FILE_CONTENT`). Add or remove entries so the file tree
   matches your file content. Keep alphabetical order within each
   folder, dotfiles last.

3. **`app/components/Portfolio.jsx` → `SYSTEM_PROMPT_ABOUT_MOHAN`**
   (near the bottom of the file). The `FACTS` section is what the AI
   assistant uses as its source of truth. Replace placeholder
   projects, achievements, and contact info with real ones. Don't
   change the GROUNDING RULES or RESPONSE STYLE sections.

4. **`public/resume.pdf`** — replace with your real resume.

5. **`app/layout.jsx`** — update `metadata` (title, description, OG
   tags, `metadataBase` URL).

6. **`vercel.json`** — change the CORS allowlist for `/api/*` from
   `https://mohanlu.com` to your actual production domain.

## Step 3 — push to GitHub

```bash
git init
git add -A
git commit -m "initial commit"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/portfolio.git
git push -u origin main
```

Confirm `.env.local` is **not** in the commit — `.gitignore` excludes
it, but double-check.

## Step 4 — connect to Vercel

Two options, pick one:

### Option A: Vercel dashboard (easier)

1. Visit https://vercel.com/new
2. Import the GitHub repo
3. Vercel auto-detects Next.js — leave build settings at defaults
4. Click **Deploy** (don't add env vars yet, we'll do that in step 5)

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts. Choose "no" for "Want to link to existing project?"
# unless you've created one already.
```

## Step 5 — set environment variables

In the Vercel dashboard:

1. Go to **Project → Settings → Environment Variables**
2. Add `ANTHROPIC_API_KEY` with your key (Production scope)
3. Optional: enable Vercel KV for persistent rate limiting:
   - Go to **Storage → Create Database → KV**
   - Connect it to this project
   - Vercel automatically injects `KV_REST_API_URL` and
     `KV_REST_API_TOKEN`

Trigger a redeploy (Settings → Deployments → ⋯ → Redeploy) so the new
env vars take effect.

## Step 6 — flip the chat to live mode

Edit `app/components/Portfolio.jsx`:

```js
const CHAT_CONFIG = {
  useRealLLM: true,  // ← was false
  ...
};
```

Commit and push. Vercel auto-deploys.

## Step 7 — connect a custom domain (optional)

1. Buy a domain (Namecheap, Cloudflare Registrar, etc.)
2. In Vercel: **Project → Settings → Domains → Add**
3. Enter your domain. Vercel shows DNS records to add at your
   registrar.
4. Wait 5-30 minutes for DNS propagation.
5. Update `vercel.json` CORS allowlist to your domain.
6. Update `metadataBase` in `app/layout.jsx`.

## Step 8 — verify everything

- [ ] Site loads at your domain
- [ ] Loading screen plays for ~3s, then IDE appears
- [ ] File tree shows your real files
- [ ] Clicking a file opens it in the editor
- [ ] Terminal accepts commands (`help`, `ls`, `cat README.md`)
- [ ] Chat assistant answers questions accurately
- [ ] Chat refuses to invent facts (test: "What's Mohan's GPA?")
- [ ] Uncertainty banner appears for hedge-y responses
- [ ] Status bar shows your visitor count, time, IP, "available" pill
- [ ] On mobile/narrow viewports, panels resize without overlap
- [ ] Open https://securityheaders.com → enter your domain → score A or A+

## Troubleshooting

**Chat returns "Couldn't reach the server"**
- Check `ANTHROPIC_API_KEY` is set in Vercel env vars (Production)
- Check the deployment redeployed after adding the env var
- Check the Vercel function logs (Project → Logs) for the actual error

**Chat returns 429 immediately**
- Rate limit is 20/hour/IP. If testing from one IP, reduce the limit
  in `app/api/chat/route.ts` (`RATE_LIMIT_PER_HOUR`) or wait an hour.

**Hydration mismatch warnings in browser console**
- The `LiveClock` and `VisitorCounter` components compute time-based
  values that differ between server and client. They're already
  wrapped in `useEffect`-based updates. If you see new mismatches,
  ensure any new dynamic content is computed in `useEffect`, not
  inline.

**Fonts not loading**
- The site uses Geist via Google Fonts. Check the network tab for
  blocked requests. If your CSP is overly strict, add
  `https://fonts.googleapis.com` and `https://fonts.gstatic.com` to
  the allowlist in `vercel.json`.

## Maintenance

- Run `npm audit` monthly. Patch any high/critical CVEs.
- Update Anthropic SDK version when new Claude models drop.
- The visitor counter is a localStorage trick — meaningless as a real
  metric. If you want real analytics, add Plausible or Vercel
  Analytics (and update the privacy section of any compliance docs).
- Anthropic API spend: set up billing alerts in the Anthropic console.

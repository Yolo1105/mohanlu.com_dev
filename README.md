# mohanlu.com — portfolio v2

An interactive portfolio designed to look and behave like a real code
editor. Visitors can browse a file tree, run terminal commands, chat
with an AI assistant grounded in real biographical facts, and see
what a working IDE feels like — all in the browser.

Built as a single-page React app on Next.js, deployed to Vercel.

## Features

- **Cursor-IDE chrome.** Activity bar, file tree, tabs, breadcrumbs,
  line-number gutter, terminal, status bar. Resizable panels.
- **Real file content.** Markdown, YAML, JSON, dotfiles, and bash
  scripts each rendered with appropriate syntax highlighting and a
  matching line gutter.
- **Working terminal** with 40+ commands (Linux-style + portfolio
  jokes). `cd`, `ls`, `tree`, `find`, `grep`, `wc`, `cat`, `git
  status`, `coffee`, `cowsay`, `42`, `hire`, etc.
- **AI assistant** — strict-grounding chat about Mohan's work.
  Refuses to invent facts. Shows uncertainty banners when responses
  hedge.
- **Multiple side panels.** File tree, search, activity (commit
  history), stack, achievements, timeline, contact.
- **Wandering Tux pet** — animated SVG penguin with a state machine,
  drags and drops, idles, emotes.
- **GitHub-style activity heatmap.**
- **Loading sequence** with typewriter command-line typing over a
  particle network background (matches the original mohanlu.com
  homepage aesthetic).

## Project structure

```
mohanlu-portfolio/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Anthropic API proxy with rate limiting
│   ├── components/
│   │   └── Portfolio.jsx         # The IDE component (one file, ~6700 lines)
│   ├── globals.css               # Tailwind + reset
│   ├── layout.jsx                # Root layout, fonts, metadata
│   └── page.jsx                  # Renders <Portfolio />
├── docs/
│   └── SECURITY.md               # Threat model + deployment requirements
├── public/                       # Static assets (resume.pdf, og.png, etc.)
├── .env.example                  # Copy to .env.local, fill in keys
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json                   # Security headers + caching rules
└── README.md
```

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your Anthropic API key
cp .env.example .env.local
# edit .env.local

# 3. Start dev server
npm run dev
# open http://localhost:3000
```

The chat will work in mock mode (pattern-matched responses) by default.
To enable the live LLM:

```js
// in app/components/Portfolio.jsx, find:
const CHAT_CONFIG = {
  useRealLLM: false,  // ← change to true
  ...
};
```

## Deployment to Vercel

```bash
# Push to GitHub, then connect the repo to Vercel via the dashboard,
# OR deploy directly via the Vercel CLI:
npm i -g vercel
vercel
```

Required environment variables (set in Vercel dashboard → Project →
Settings → Environment Variables, Production scope):

| Variable             | Required? | Purpose                                |
| -------------------- | --------- | -------------------------------------- |
| `ANTHROPIC_API_KEY`  | yes       | Server-side chat API authentication    |
| `KV_REST_API_URL`    | optional  | Persistent rate limiting via Vercel KV |
| `KV_REST_API_TOKEN`  | optional  | Same                                   |

If you skip Vercel KV, rate limiting falls back to in-memory (still
enforced per edge instance, just resets on cold starts).

## Customizing for your own portfolio

This site is currently populated with **placeholder content** for
projects and achievements. To make it yours:

1. **Replace `FILE_CONTENT` in `Portfolio.jsx`.** This object holds
   every file the visitor can open — bio.sh, README.md, project
   READMEs, etc. Edit each entry's `body` string.
2. **Update the file tree.** Find the `tree` constant in
   `Portfolio.jsx` and add/remove entries to match your `FILE_CONTENT`.
3. **Update the FACTS section in `SYSTEM_PROMPT_ABOUT_MOHAN`.** This
   is what the AI assistant uses as its source of truth. The structure
   is what makes the prompt work — keep the headers, swap the content.
4. **Replace `public/resume.pdf`** with your real resume.
5. **Update `metadata` in `app/layout.jsx`** — title, description, OG.
6. **Update CORS allowlist in `vercel.json`** — change
   `https://mohanlu.com` to your domain.

## Security

See [`docs/SECURITY.md`](./docs/SECURITY.md) for the full threat model,
in-code defenses, and deployment-layer requirements.

Key points:
- API key is server-side only, never exposed to the client
- Rate limiting (20 req/hour/IP) on `/api/chat`
- Strict CSP, HSTS, X-Frame-Options, and other security headers via
  `vercel.json`
- ReDoS protection on user-supplied regex (search panel + terminal grep)
- AI assistant grounded in a structured FACTS section — refuses to
  invent biographical claims, surfaces uncertainty banner when hedging

## Tech stack

- **React 18** + **Next.js 14** (App Router)
- **Tailwind CSS** for utility classes
- **Lucide React** for icons
- **Anthropic SDK** for chat (Claude Sonnet 4.5)
- **Vercel** for hosting + Edge runtime + optional KV

## License

Personal portfolio — all rights reserved. The code is open for
inspection, not for republication. If you want to adapt the layout
or any specific component, reach out via the contact panel and we
can talk.

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Files, Search, GitBranch, Package,
  ChevronRight, ChevronDown, Folder, FolderOpen,
  FileText, FileJson, FileCode, FileType,
  X,
  Settings2, Sparkles,
  Circle, Send,
  MapPin, Download,
  Award, Calendar, Mail, GraduationCap, Briefcase, Rocket, Linkedin, Github, Clock,
  Copy, RefreshCw, Check,
  User, Wifi, TerminalSquare,
  Star, Heart, Music2, AlertTriangle,
} from 'lucide-react';

// ── Cursor Anysphere palette ─────────────────────────────────────────────
const C = {
  bgDeepest: '#141414',
  bgEditor:  '#181818',
  bgTab:     '#1a1a1a',
  bgInput:   '#232323',
  bgHover:   '#1f1f1f',
  bgChip:    '#202020',
  border:    '#2a2a2a',
  textPrimary:   '#d6d6dd',
  textSecondary: '#8a8a93',
  textMuted:     '#505050',
  textActive:    '#ffffff',
  accent:    '#87c3ff',
  accentBg:  '#1a3658',
  synFn:      '#efb080',
  synKeyword: '#83d6c5',
  synType:    '#87c3ff',
  synString:  '#e394dc',
  synComment: '#6d6d6d',
  synAttr:    '#aaa0fa',
  ok:    '#15ac91',
  warn:  '#e5b95c',
  err:   '#f14c4c',
};

// ── File content (kept brief, placeholder only) ─────────────────────────
const FILE_CONTENT = {
  'README.md': { kind: 'markdown', body:
`# {c:synKeyword:const} {c:synType:mohan} = {c:synFn:engineer} + {c:synString:student} + {c:synAttr:shipper};

cs undergrad at [[nyu tandon|experience/nyu.md|synType]]. [[full-stack|projects/flareo.md|synFn]] engineer with detours into [[embedded firmware|projects/arduino-rover.md|synKeyword]] and [[3d scenes|projects/particle-canvas.md|synString]]. strong bias toward shipping, mild obsession with making things feel good.

> This site is my portfolio. Instead of a marketing page, I made it look like a code editor, because that's where I actually live. [[Click around|README.md|accent]]. [[Open files|about/bio.sh|accent]]. [[Run commands|focus:terminal|accent]]. [[Ask the assistant|focus:chat|accent]].

## the basics

\`\`\`yaml
location:    new york, ny
school:      nyu tandon, class of 2027
focus:       full-stack, distributed systems, embedded
shipping:    flareo v1.2 (cloudflare workers + postgres)
learning:    rust on weekends
status:      open to summer 2026 internships
\`\`\`

## what's this thing built with

The whole site is one React component. No router. No state library. Tailwind for utility classes, plain CSS for animations, custom SVGs everywhere.

- **React + Tailwind** drive the UI
- **Lucide** for icons, **Geist** and **Geist Mono** for type
- **Custom SVG penguin** wanders the left panel. Handwritten state machine. Click him. Drag him.
- The chat assistant runs in mock mode today, with a clean swap path to a real LLM via Vercel serverless route. Everything else is fully client-side.

## what you can actually do here

This isn't a static page. Most of the IDE works:

- **Browse the file tree** on the left. Real markdown, real code blocks, real content. The \`projects/\` folder is where the engineering writeups live.
- **Use the side panels.** The activity bar swaps the left panel between file tree, content search, recent commits, my stack as a list of installed extensions, achievements, timeline, and contact.
- **Talk to the assistant** on the right. It actually answers. Try asking *"why hire her?"* or *"tell me about flareo"*. Type \`/\` for slash commands.
- **Open the terminal** at the bottom. \`ls\`, \`cat\`, \`whoami\`, \`whois\` all work. The bottom panel also has **OUTPUT** (live activity log) and **PORTS** (every place you can find me online).

## try the terminal

\`\`\`bash
$ whoami
mohan lu, undergrad @ nyu tandon, full-stack engineer

$ ls projects
flareo.md
particle-canvas.md
arduino-rover.md

$ cat projects/flareo.md
# opens the file in the editor

$ help
# shows the full command list
\`\`\`

The terminal remembers command history (up/down arrows). \`help\` lists everything available.

## quick links

If you'd rather skip the tour:

- **bio**: \`about/bio.sh\`
- **resume**: \`about/resume.pdf\`
- **best project**: \`projects/flareo.md\`
- **all my links**: open the **PORTS** tab in the bottom panel
- **email me**: the mail icon in the activity bar (fastest way)

---

> Thanks for stopping by. If you build something cool, I'd love to hear about it.
`},
  'github.md': { kind: 'markdown', body:
`# {c:synKeyword:open}/{c:synType:public} {c:synAttr:→} {c:synFn:source}

\`github.com/mohanlu\`

A few public repos worth a look:

- **flareo**, full-stack worker pipeline w/ Postgres + R2
- **particle-canvas**, interactive WebGL particle system
- **arduino-rover**, autonomous rover w/ ROS
- **dotfiles**, my zsh + neovim setup
- **mohanlu.com**, this site

## activity
~12 commits this week · most active in {c:synKeyword:TypeScript} and {c:synKeyword:Python}.

` },
  'linkedin.md': { kind: 'markdown', body:
`# {c:synKeyword:profile} {c:synAttr:://} {c:synType:professional}

\`linkedin.com/in/mohan-lu\`

## current
- **NYU Tandon**, B.S. Computer Science, class of 2027
- Focus: full-stack engineering, systems, AI tooling

## experience
- Building **flareo**, full-stack worker pipeline (TS / Postgres / R2)
- Self-directed full-stack web development, 2 years
- Coursework in algorithms, systems, software engineering

## skills
TypeScript · Python · C++ · React · Node.js · PostgreSQL · Docker · ROS · Blender

## reach out
Open to internships and collaborations. Best contact through the email in \`contact.json\`.
` },
  'about/bio.sh': { kind: 'bash', body:
`#!/bin/bash
# bio.sh — who I am, in script form
# run with: ./bio.sh

echo "============================================"
echo "  WHOAMI: mohan lu"
echo "============================================"

NAME="Mohan Lu"
PRONOUNS="she/her"
ROLE="full-stack engineer"
SCHOOL="NYU Tandon"
GRADUATING="2027"
LOCATION="New York, NY"

echo "name        $NAME"
echo "role        $ROLE"
echo "school      $SCHOOL  (class of $GRADUATING)"
echo "located     $LOCATION"
echo ""

# What I've been building
echo "## recent work"
PROJECTS=(
  "flareo            full-stack pipeline on Cloudflare Workers + Postgres"
  "particle-canvas   interactive WebGL particle field, hand-rolled physics"
  "arduino-rover     autonomous rover with cooperative-scheduler firmware"
)
for p in "\${PROJECTS[@]}"; do
  echo "  - $p"
done
echo ""

# Stack I reach for
echo "## tech I use daily"
STACK="typescript python react tailwind"
echo "  $STACK"
echo ""
echo "## tech I'm actively building with"
echo "  cplusplus postgres cloudflare-workers redis"
echo ""
echo "## currently learning"
echo "  rust  # working through the book on weekends"
echo ""

# Values
echo "## what I care about"
cat <<EOF
  - clean code that's kind to the next person reading it
  - tools that make hard things feel obvious
  - building things that are durable, not just demoable
  - shipping before perfect
  - the boring solution is usually right
EOF
echo ""

# Status
echo "## current status"
if [ "$AVAILABLE" = "true" ]; then
  echo "  open to summer 2026 internships"
else
  echo "  heads down on portfolio v2"
fi

echo ""
echo "# end of bio. for more, run \\\`cat config.yaml\\\` or open the chat."
` },
  'about/timeline.json': { kind: 'json', body: {
    education: [{ school: 'NYU Tandon', from: '2023', focus: 'Computer Science' }],
    milestones: [
      { date: '2024-08', event: 'First full-stack project shipped' },
      { date: '2025-03', event: 'Started learning Rust' },
      { date: '2026-01', event: 'Building portfolio v2' }
    ]
  }},
  'about/resume.pdf': { kind: 'pdf' },
  'experience/nyu.md': { kind: 'markdown', body:
`# {c:synKeyword:school}: {c:synType:nyu_tandon}

Undergraduate, **Computer Science**, class of {c:synFn:2027}.

Coursework focused on {c:synKeyword:systems}, {c:synKeyword:algorithms}, and {c:synKeyword:software engineering}.
` },
  'projects/flareo.md': { kind: 'markdown', body:
`# {c:synFn:flareo} {c:synAttr:// pipeline}

A full-stack worker pipeline for processing and storing media at scale, built on [[Cloudflare's edge stack|projects/flareo.md|synType]] with a {c:synKeyword:Postgres} metadata layer.

> Built because every off-the-shelf job queue I tried either didn't run on the edge or required spinning up infra I didn't want to babysit.

## What it does

Accepts upload requests at the edge, runs transformation pipelines (resize, transcode, hash, scan), persists outputs to R2, and exposes a typed query API for the frontend. Built around three guarantees: **at-least-once** processing, **idempotent** retries, and **observable** failure modes.

## Architecture

\`\`\`
client → POST /upload → Worker (auth + validate)
                     ↓
             enqueue → Cloudflare Queue
                     ↓
        consumer Worker → R2 (blob)
                       → Postgres (metadata, status)
                       → Webhook (downstream notify)
\`\`\`

A single Cloudflare Worker handles ingress; a separate consumer Worker subscribes to the queue and executes the pipeline. State lives in Postgres (Hyperdrive-backed) so the consumers themselves are stateless and horizontally scalable.

## Stack

- **Runtime**, Cloudflare Workers + Queues + R2
- **Database**, PostgreSQL via Hyperdrive (pooled at the edge)
- **Schema**, Drizzle ORM with strict TypeScript inference
- **Observability**, Structured logs to Workers Logpush + custom dashboards in Grafana
- **Auth**, JWT (RS256) with key rotation via D1

## Tradeoffs I made

- **Postgres over D1.** D1 would be cheaper and edge-native, but I needed JSONB and complex indexing across multi-tenant data. Worth the hop to Hyperdrive.
- **Queues over Durable Objects.** DOs are great for coordination but overkill for a fire-and-forget pipeline. Queues' built-in retries + DLQ saved me writing my own retry logic.
- **Idempotency keys at the API layer**, not the consumer. Means clients can safely retry without me having to dedupe inside the pipeline, a big simplification.

## What I'd do differently

The transcoding step initially ran inside the consumer Worker. Worker CPU limits made anything heavier than image resize impractical. v1.2 splits transcoding to a separate fan-out path that posts to a serverless GPU provider, works, but the abstraction got leaky. If I rebuilt it I'd model the pipeline as discrete *steps* from the start instead of monolithic consumers.

## Status

**v1.2 shipped April 2026.** Currently handling ~20k jobs/day in production. Next: replacing the webhook fan-out with a proper event bus so downstream subscribers can replay missed events.

[github.com/mohanlu/flareo](https://github.com/mohanlu/flareo)
` },
  'projects/particle-canvas.md': { kind: 'markdown', body:
`# {c:synFn:particle_canvas} {c:synAttr:// webgl}

An interactive {c:synKeyword:WebGL} particle field that connects nearby particles into a constellation mesh and reacts to the cursor.

> Hand-rolled physics, no library dependencies. Built it to learn how to write performant graphics code without leaning on three.js.

## The effect

Particles drift on slow Brownian motion, but any pair within a threshold distance draws a line between them, opacity scaled by distance. The cursor acts as a soft attractor: particles within range nudge toward it, creating a localized swarm. Move fast and the mesh tears like a soap film.

## How it works

The naive O(n²) pairwise distance check breaks down past ~300 particles. So:

\`\`\`typescript
// Spatial hash grid, bucket particles by cell, only check
// neighbors within current cell + 8 adjacent cells.
const grid = new Map<string, Particle[]>();
const CELL = LINK_DISTANCE; // grid cell = link threshold
for (const p of particles) {
  const key = \`\${(p.x / CELL) | 0},\${(p.y / CELL) | 0}\`;
  (grid.get(key) ?? grid.set(key, []).get(key)).push(p);
}
\`\`\`

That alone took the per-frame work from O(n²) to roughly O(n) for typical densities, and unlocked 2000+ particles at 60fps on a midrange laptop.

## What I learned

- **GPU compute would've been faster but worse to debug.** Started writing it as a compute shader, switched to plain canvas2d + spatial hashing once I realized I'd hit the limit of my WebGL debugging stamina before I'd hit a perf wall.
- **The bottleneck was the line stroking, not the math.** Rendering 4000+ short line segments is heavier than computing them. Batching adjacent strokes by alpha bucket cut paint time by ~40%.
- **Linear interpolation for cursor force gives a "syrupy" feel that beats any spring constant I tried.**

## Run it

\`\`\`bash
git clone https://github.com/mohanlu/particle-canvas
cd particle-canvas && npm install && npm run dev
\`\`\`

Knobs are exposed via \`config.ts\`, particle count, link distance, drift speed, attractor radius. Live-reloads on save.

[github.com/mohanlu/particle-canvas](https://github.com/mohanlu/particle-canvas)
` },
  'projects/arduino-rover.md': { kind: 'markdown', body:
`# {c:synFn:arduino_rover} {c:synAttr:// embedded}

A small autonomous rover that wanders a room, avoids obstacles via {c:synKeyword:ultrasonic ranging}, and accepts manual override over {c:synKeyword:Bluetooth} from a companion mobile app.

## Why I built it

Wanted hands-on with the full embedded loop, sensor → microcontroller → actuator → host comms, without hiding behind a hobby framework that abstracts away timing and interrupts.

## Hardware

- **Compute**, Arduino Uno (ATmega328P) for sensors + motor control, Raspberry Pi 4 for higher-level path planning over UART
- **Sensors**, HC-SR04 ultrasonic on a servo-mounted sweep, MPU-6050 IMU for heading
- **Drive**, TT motor + L298N H-bridge for differential drive
- **Comms**, HC-05 Bluetooth Classic for phone control (LE was tempting but the latency was worse for joystick input)
- **Power**, 4×AA NiMH for motors, 9V for logic. Yes, separate rails, running everything off one battery caused brownouts on motor spikes.

## Firmware architecture

The Arduino runs a cooperative scheduler, no RTOS, just a tick loop with phase-buckets so the ultrasonic sweep, IMU read, motor PWM, and serial parse never block each other.

\`\`\`cpp
// Tick loop runs at 50 Hz. Each subsystem checks its own
// next_run_ms and yields if it's not its turn.
void loop() {
  uint32_t now = millis();
  if (now >= sonar.next_run_ms) sonar.tick(now);
  if (now >= imu.next_run_ms)   imu.tick(now);
  if (now >= drive.next_run_ms) drive.tick(now);
  serial_pump();  // always
}
\`\`\`

The Pi handles anything that needs more than a few KB of state, path planning, telemetry logging, firmware OTA over UART.

## Lessons

- **Power matters more than code.** I spent two weekends chasing "ghost resets" before realizing motor stall current was dragging Vcc below the brownout threshold. Separate rails fixed it instantly.
- **Float math on an 8-bit MCU is a tax.** Switched the IMU fusion math to fixed-point Q16 and freed up ~3ms per loop.
- **Cooperative > preemptive at this scale.** RTOS would've been over-engineering for one µC and three subsystems.

## What's next

Replacing ultrasonic with a 2D LiDAR module so it can do real SLAM instead of greedy obstacle avoidance. The Pi side already has a stub for it.

[github.com/mohanlu/arduino-rover](https://github.com/mohanlu/arduino-rover)
` },
  'contact.json': { kind: 'json', body: {
    email: 'mohan@example.com',
    links: { github: 'github.com/mohanlu', linkedin: 'linkedin.com/in/mohan-lu' },
    available: true
  }},
  'now.md': { kind: 'markdown', body:
`# {c:synKeyword:now}() {c:synAttr:→} {c:synFn:current_focus}

- Building [[portfolio v2|README.md|synFn]] (this site)
- Reading *Designing Data-Intensive Applications*
- Learning {c:synKeyword:Rust} on weekends
` },
  'commands.md': { kind: 'markdown', body:
`# {c:synKeyword:commands}() {c:synAttr:→} {c:synFn:terminal_reference}

> Everything the terminal at the bottom understands. Most behave like the real Linux/macOS commands, a few are local jokes. [[Open the terminal|focus:terminal|accent]] and try them.

## navigation

- \`pwd\` — print current working directory
- \`cd <dir>\` — change directory. \`cd\`, \`cd ~\`, \`cd /\` all go home. \`cd ..\` goes up.
- \`ls [dir]\` — list contents. Folders end in \`/\`, files don't.
- \`tree\` — print the whole project as an ASCII tree
- \`find <name>\` — find files matching a name fragment

## reading files

- \`cat <file>\` — open the file in the editor (yes, technically not what cat does, but you get the file)
- \`open <file>\` — alias for \`cat\`
- \`head <file>\` — open the file (would show first lines in a real shell)
- \`tail <file>\` — open the file (would show last lines)
- \`grep <pattern> <file>\` — search inside a file. Try \`grep rust .env\`.
- \`wc <file>\` — count lines and words

## info

- \`whoami\` — who I am (Mohan)
- \`whois\` — who **you** are. Shows your browser, OS, timezone, IP. Nothing logged.
- \`date\` — current date and time
- \`uptime\` — how long this tab has been open
- \`uname\` / \`uname -a\` — pretend system info
- \`history\` — your command history this session
- \`echo <text>\` — print arguments back
- \`which <cmd>\` — pretend to locate a command
- \`man <cmd>\` — short manual page for any command

## the fun side

- \`help\` — list everything (same as opening this file)
- \`fortune\` — random programming wisdom
- \`coffee\` — a hot beverage
- \`cowsay <text>\` — a cow says what you tell it to
- \`matrix\` — wake up, Neo
- \`42\` — the answer
- \`hire\` — opens the contact panel — for serious recruiters with good taste
- \`stars\` — show off the GitHub heatmap
- \`ping <host>\` — pong
- \`sl\` — what \`ls\` looks like at 3am

## meta / jokes

- \`sudo <cmd>\` — try and see
- \`rm <file>\` — try and see (no, your portfolio is safe)
- \`mkdir\` / \`touch\` — friendly reminder this isn't a real shell
- \`vim\` / \`nano\` / \`emacs\` — editor wars
- \`git status\` — always clean
- \`npm install\` — installs vibes
- \`exit\` / \`logout\` — there's no escape

## controls

- **↑ / ↓** — walk through command history
- **Enter** — run the command
- \`clear\` — clear the terminal output
- \`theme <name>\` — switch theme (mock; the only one is anysphere-dark)

> Tip: most of these accept arguments. The terminal is forgiving — it'll tell you what went wrong if a command misfires.
` },
  'skills/coming-soon.md': { kind: 'markdown', body:
`# {c:synAttr:skills}/_

> still being written.

A full breakdown of what Mohan works with, sorted by depth, not by buzzword count, is on its way.

The short version, until then:
- **Languages**: {c:synKeyword:TypeScript}, {c:synKeyword:Python}, {c:synKeyword:C/C++}, {c:synKeyword:Java}, {c:synKeyword:Rust} (learning)
- **Web**: React, Next.js, Tailwind, Node, the Cloudflare stack
- **Data**: Postgres, MongoDB, Redis, R2 / S3
- **Embedded**: Arduino, Raspberry Pi, ROS, hardware bring-up
- **3D & creative**: Blender, basic Cinema 4D, custom WebGL

Check back soon, or just ask Mohan's assistant on the right.
` },
  '.env': { kind: 'dotfile', body:
`# .env, current personal state
# (no actual secrets, this is a portfolio after all)

STATUS=available_for_internships
CURRENT_FOCUS=portfolio_v2
LAST_SHIPPED=flareo_v1.2

LOCATION=new_york_ny
TIMEZONE=America/New_York
WORKING_HOURS=9am-10pm

LANG_PRIMARY=typescript
LANG_LEARNING=rust

COFFEE_LEVEL=high
SLEEP_DEBT=manageable
MORALE=shipping

LAST_DEPLOY=2026-04-25
NEXT_GRAD=2027-05
` },
  'config.yaml': { kind: 'yaml', body:
`# config.yaml, who I am, what I'm building, what I want
# This is the human-readable manifest for me as an engineer.

profile:
  name: Mohan Lu
  role: full-stack engineer
  school: NYU Tandon
  graduating: 2027
  pronouns: she/her

mission: >
  Build systems that feel inevitable,
  the kind people use without thinking
  about the engineering underneath.

values:
  - ship before perfect
  - taste matters as much as correctness
  - the boring solution is usually right
  - read the source before the docs
  - own the whole loop, edge to disk

stack:
  daily:    [typescript, python, react, tailwind]
  active:   [cplusplus, postgres, cloudflare-workers, redis]
  learning: [rust]
  curious:  [zig, jax, formal_methods]

current:
  building:  portfolio v2 (this site)
  reading:   Designing Data-Intensive Applications
  listening: lo-fi + occasional jazz
  shipping:  Flareo v1.2

looking_for:
  type:        summer 2026 internship
  domains:     [full-stack, distributed_systems, embedded]
  location:    [NYC, remote, willing_to_relocate]
  start_date:  2026-05
  duration:    12-14 weeks

contact:
  preferred:  email
  response:   ~4 hours
  cal:        cal.com/mohanlu
` },
  '.preferences': { kind: 'dotfile', body:
`# ~/.preferences
alias coffee="strong"
alias music="violin"
alias mvp="ship-it"

export FAVORITE_LANG=typescript
export TIMEZONE=America/New_York
` },
};

// ── File tree ────────────────────────────────────────────────────────────
// Standard codebase layout: folders first (alphabetical), then files
// (alphabetical), with hidden dotfiles last. README.md is the canonical
// orientation file at the root.
const tree = [
  { type: 'folder', name: 'about', defaultOpen: true, children: [
    { type: 'file', name: 'bio.sh',        path: 'about/bio.sh',        icon: 'bash' },
    { type: 'file', name: 'timeline.json', path: 'about/timeline.json', icon: 'json' },
    { type: 'file', name: 'resume.pdf',    path: 'about/resume.pdf',    icon: 'pdf' },
  ]},
  { type: 'folder', name: 'experience', defaultOpen: false, children: [
    { type: 'file', name: 'nyu.md', path: 'experience/nyu.md', icon: 'md' },
  ]},
  { type: 'folder', name: 'projects', defaultOpen: true, children: [
    { type: 'file', name: 'flareo.md',          path: 'projects/flareo.md',          icon: 'md' },
    { type: 'file', name: 'particle-canvas.md', path: 'projects/particle-canvas.md', icon: 'md' },
    { type: 'file', name: 'arduino-rover.md',   path: 'projects/arduino-rover.md',   icon: 'md' },
  ]},
  { type: 'folder', name: 'skills',  defaultOpen: false, children: [
    { type: 'file', name: 'coming-soon.md', path: 'skills/coming-soon.md', icon: 'md' },
  ]},
  // Files (alphabetical, then dotfiles)
  { type: 'file', name: 'commands.md', path: 'commands.md', icon: 'md' },
  { type: 'file', name: 'config.yaml',  path: 'config.yaml',  icon: 'yaml' },
  { type: 'file', name: 'contact.json', path: 'contact.json', icon: 'json' },
  { type: 'file', name: 'now.md',       path: 'now.md',       icon: 'md' },
  { type: 'file', name: 'README.md',    path: 'README.md',    icon: 'md' },
  // Dotfiles last
  { type: 'file', name: '.env',         path: '.env',         icon: 'config' },
  { type: 'file', name: '.preferences', path: '.preferences', icon: 'config' },
];

// ── Resize hook ──────────────────────────────────────────────────────────
function useResize(initial, { min, max, axis = 'x', invert = false }) {
  const [size, setSize] = useState(initial);
  const startRef = useRef({ pos: 0, size: 0 });
  const draggingRef = useRef(false);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    draggingRef.current = true;
    startRef.current = {
      pos: axis === 'x' ? e.clientX : e.clientY,
      size,
    };
    document.body.style.cursor = axis === 'x' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  }, [size, axis]);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const cur = axis === 'x' ? e.clientX : e.clientY;
      const delta = cur - startRef.current.pos;
      const next = invert
        ? startRef.current.size - delta
        : startRef.current.size + delta;
      setSize(Math.max(min, Math.min(max, next)));
    };
    const onUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [axis, invert, min, max]);

  return [size, onMouseDown];
}

// ── Resize handle ────────────────────────────────────────────────────────
function ResizeHandle({ onMouseDown, axis }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        cursor: axis === 'x' ? 'col-resize' : 'row-resize',
        ...(axis === 'x' ? { width: 4 } : { height: 4 }),
        zIndex: 20,
      }}
    >
      <div style={{
        position: 'absolute',
        ...(axis === 'x'
          ? { top: 0, bottom: 0, left: '50%', width: 1, transform: 'translateX(-50%)' }
          : { left: 0, right: 0, top: '50%', height: 1, transform: 'translateY(-50%)' }),
        background: hover ? C.accent : C.border,
        transition: 'background 100ms',
      }} />
    </div>
  );
}

// ── ReDoS-safe regex helpers ─────────────────────────────────────────────
// JavaScript regexes have no built-in execution timeout, so a pathological
// pattern (e.g. `(a+)+$` against a long input) can freeze the tab via
// catastrophic backtracking. We can't fully prevent this at the engine
// level, but two cheap defenses get us 99% of the way:
//
//   1. Cap pattern length. Most useful queries are < 100 chars.
//   2. Wall-clock budget while iterating lines. If a single match call
//      hangs the engine, we can't interrupt it; but if the pattern matches
//      slowly across many lines, we bail before the user notices.
//
// Both helpers return a clear error string on failure so callers can show
// a friendly message instead of crashing or freezing.

const REGEX_PATTERN_MAX_LEN = 200;
const REGEX_BUDGET_MS = 100;

// Compile a pattern safely. Returns { re } or { error }.
function compileSafeRegex(pattern, flags = 'i') {
  if (typeof pattern !== 'string') return { error: 'pattern must be a string' };
  if (pattern.length > REGEX_PATTERN_MAX_LEN) {
    return { error: `pattern too long (max ${REGEX_PATTERN_MAX_LEN} chars)` };
  }
  try {
    return { re: new RegExp(pattern, flags) };
  } catch (e) {
    return { error: 'invalid pattern' };
  }
}

// Run a regex over an array of strings with a wall-clock budget. If the
// budget is exceeded, returns matches found so far plus a partial flag.
// `mapper(line, i)` builds the per-match record (default: { lineNum, line }).
function safeRegexFilter(re, lines, mapper) {
  const start = Date.now();
  const matches = [];
  let partial = false;
  for (let i = 0; i < lines.length; i++) {
    if (Date.now() - start > REGEX_BUDGET_MS) { partial = true; break; }
    re.lastIndex = 0;
    if (re.test(lines[i])) {
      matches.push(mapper ? mapper(lines[i], i) : { lineNum: i + 1, line: lines[i] });
    }
  }
  return { matches, partial };
}

// ── File icon ────────────────────────────────────────────────────────────
function FileIcon({ kind }) {
  const p = { size: 12, strokeWidth: 1.5 };
  if (kind === 'md')     return <FileText  {...p} style={{ color: C.synType }} />;
  if (kind === 'json')   return <FileJson  {...p} style={{ color: C.synAttr }} />;
  if (kind === 'pdf')    return <FileType  {...p} style={{ color: C.err }} />;
  if (kind === 'config') return <Settings2 {...p} style={{ color: C.synFn }} />;
  if (kind === 'yaml')   return <FileCode  {...p} style={{ color: C.synKeyword }} />;
  if (kind === 'bash')   return <TerminalSquare  {...p} style={{ color: C.synKeyword }} />;
  return <FileCode {...p} style={{ color: C.textSecondary }} />;
}

// Single source of truth for path → file kind. Used everywhere we need
// to display a file icon or open a tab from a path string. Centralizing
// this prevents inconsistent extension handling across breadcrumbs,
// search, terminal, chat citations, and inline file-link tokens.
function fileKindFromPath(path) {
  // Look at the leaf segment for dotfile detection — full paths like
  // "about/.env" should still match dotfile, not the path itself.
  const leaf = path.split('/').pop() || path;
  if (leaf.endsWith('.json'))                              return 'json';
  if (leaf.endsWith('.pdf'))                               return 'pdf';
  if (leaf.endsWith('.yaml') || leaf.endsWith('.yml'))     return 'yaml';
  if (leaf.endsWith('.sh'))                                return 'bash';
  if (leaf.startsWith('.'))                                return 'config';
  return 'md';
}

// ── Uncertainty detection ────────────────────────────────────────────────
// Scans an assistant message for hedge phrases that suggest the model is
// guessing. When detected, the chat UI surfaces a small "this might not be
// accurate" hint with a link to the contact panel. The phrases below were
// chosen because they correlate with hallucination (the model knows it's
// uncertain) — true confident answers don't usually contain them.
//
// We deliberately don't flag soft phrases like "I think" used in casual
// opinion contexts; the system prompt discourages those entirely, so if
// they appear it's worth surfacing.
const HEDGE_PATTERNS = [
  /\bI (think|believe|guess|suspect|assume)\b/i,
  /\b(probably|likely|might have|may have|possibly|perhaps)\b/i,
  /\b(I'm not (sure|certain)|not entirely sure|hard to say)\b/i,
  /\b(if I had to guess|my best guess|something like)\b/i,
  /\b(approximately|roughly|around) \d/i,
];

// Detect hedge phrases in concatenated assistant text. Returns true if
// the response contains uncertain language. Skips the message if the
// model has explicitly said "I don't have that detail" — that's the
// honest refusal we want, not uncertainty masquerading as fact.
function detectUncertainty(text) {
  if (!text || text.length < 20) return false;
  // If the model has done the right thing and said it doesn't know,
  // don't flag it. Honest refusals contain phrases like:
  const honestRefusals = [
    /I don'?t have that/i,
    /not something I can confirm/i,
    /isn'?t covered in what I have/i,
    /Mohan would need to answer/i,
    /email is the right channel/i,
    /email is fastest/i,
  ];
  if (honestRefusals.some(re => re.test(text))) return false;
  return HEDGE_PATTERNS.some(re => re.test(text));
}


// VS Code-style left gutter, used INSIDE individual code-style panes
// (dotfile, yaml, json, bash) where each rendered line corresponds to a
// real source line. Markdown panes don't use this — rendered markdown
// has variable-height blocks (headings, code blocks, etc.) that don't
// align cleanly with a uniform-line gutter.
//
// The gutter sets its own line-height to match the content's, so numbers
// align row-for-row. Pass the actual line count of the content.
// ── Loading screen ───────────────────────────────────────────────────────
// SSR-safe boot sequence inspired by the LiveTerm-themed dev branch.
// Combines a 7-phase narrative — SSH connection, MOTD, systemctl status,
// boot sequence, /proc introspection, recruiter-aware tip, final greeting.
//
// SSR/HYDRATION SAFETY: this component renders NOTHING on the server.
// All randomized values (star positions, floating icon placements,
// per-character delays) are generated only inside useEffect, after mount.
// Otherwise React would see different output between SSR and hydration
// (random seeds differ) and throw a hydration mismatch error.
//
// COLOR PHILOSOPHY: white body text with a single accent color —
// C.accent (soft sky blue, #87c3ff) for prompts, success states, and
// emphasis. This matches the IDE's main accent so the loading screen
// flows visually into the editor when it fades. Peach (C.synFn) is
// reserved for numeric counts that benefit from extra contrast.
//
// TYPING FEEL: every line types char-by-char, including output. Per-line
// random typing speeds (chosen on each line, not each character) make
// some lines feel quicker and others more deliberate. Random pauses
// occasionally punctuate lines — a "thinking" beat that mimics real
// shell I/O variance.
function LoadingScreen({ fadingOut, onComplete }) {
  // Each LINE shape:
  //   { p: 'prompt text',  pc: 'colorClass',   // optional prompt + class
  //     t: 'body text',    tc: 'colorClass',   // body text + class
  //     tail: { text, cls } | [{text, cls}],   // optional inline accents
  //     thinkAfter: bool,                       // add a longer "thinking"
  //                                             // pause after this line
  //   }
  // Special t value: empty string '' renders a blank spacer line.
  const LINES = [
    // Phase 1 — SSH connection
    { p: 'mohan@local:~$ ', pc: 'accent', t: 'ssh mohanlu.com', thinkAfter: true },
    { t: '' },
    { t: "The authenticity of host 'mohanlu.com' could not be established." },
    { t: 'ECDSA fingerprint is SHA256:she/her/ships' },
    { t: 'Are you sure you want to continue connecting (yes/no)? ', tail: { text: 'yes', cls: 'accent' } },
    { t: "Warning: Permanently added 'mohanlu.com' to the list of known hosts." },
    { t: '' },

    // Phase 2 — MOTD
    { t: '* * * * * * * * * * * * * * * * * * * * * * * * * * * *', tc: 'accent' },
    { t: '*  Welcome to mohanlu.com (Mohanland 4.2.0-portfolio)  *', tc: 'accent' },
    { t: "*  Last login: never. You're the first today.          *", tc: 'accent' },
    { t: '* * * * * * * * * * * * * * * * * * * * * * * * * * * *', tc: 'accent' },
    { t: '' },

    // Phase 3 — systemctl status
    { p: 'mohan@dev:~$ ', pc: 'accent', t: 'systemctl status portfolio.service', thinkAfter: true },
    { t: 'portfolio.service - Mohan Lu, Software Engineer' },
    { t: '   Loaded: loaded (/etc/mohan/portfolio.v2.conf; enabled)' },
    { t: '   Active: ', tail: [
        { text: 'active (running)', cls: 'accent' },
        { text: ' since first commit, July 2023' },
      ] },
    { t: '   Uptime: ', tail: { text: '24,432 hours · 0 unplanned restarts', cls: 'peach' } },
    { t: '     Load: 0.42, 0.42, 0.42 (heads down)' },
    { t: '' },

    // Phase 4 — boot sequence
    { p: 'mohan@dev:~$ ', pc: 'accent', t: 'launch portfolio.v2', thinkAfter: true },
    { t: '[1/8] mounting /projects ',     tail: { text: '3 repos',         cls: 'peach' } },
    { t: '[2/8] mounting /experience ',   tail: { text: '1 entry',         cls: 'peach' } },
    { t: '[3/8] mounting /skills ',       tail: { text: '19 technologies', cls: 'peach' } },
    { t: '[4/8] mounting /achievements ', tail: { text: '6 honors',        cls: 'peach' } },
    { t: '[5/8] starting terminal ',      tail: { text: '40 commands ok',  cls: 'accent' } },
    { t: '[6/8] starting AI assistant ',  tail: { text: 'grounded',        cls: 'accent' } },
    { t: '[7/8] starting penguin pet ',   tail: { text: '17 states ok',    cls: 'accent' } },
    { t: '[8/8] applying anysphere-dark theme ', tail: { text: 'ok',       cls: 'accent' } },
    { t: '' },

    // Phase 5 — /proc/mohan/status
    { p: 'mohan@dev:~$ ', pc: 'accent', t: 'cat /proc/mohan/status', thinkAfter: true },
    { t: 'Name:           Mohan Lu' },
    { t: 'Pronouns:       she/her' },
    { t: 'State:          ', tail: { text: 'building', cls: 'accent' } },
    { t: 'Coffee:         ', tail: { text: 'strong, refilled', cls: 'peach' } },
    { t: 'Currently:      open to summer 2026 internships' },
    { t: '' },

    // Phase 6 — recruiter-aware
    { t: 'detected: visitor (probably hiring)' },
    { t: 'tip: ask the assistant ', tail: { text: '"why hire her?"', cls: 'peach' } },
    { t: '' },

    // Phase 7 — final greeting
    { t: 'All systems operational. Welcome, visitor.', tc: 'accent' },
    { t: 'Type ', tail: [
        { text: "'help'", cls: 'accent' },
        { text: ' in the terminal, or click any file to begin.' },
      ] },
  ];

  // Two-color palette: white body + soft blue accent + peach for numbers.
  const COLORS = {
    accent: C.accent,       // soft sky blue (#87c3ff) — prompts, success, emphasis
    peach:  C.synFn,        // peach (#efb080) — numeric counts only
    body:   C.textActive,   // pure white — everything else
  };
  const colorOf = (cls) => COLORS[cls] || COLORS.body;

  // ── Mount gate (SSR safety) ────────────────────────────────────────
  // Render nothing meaningful on the server. All randomized visuals and
  // animation timing run only after `mounted` flips true post-hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ── Random visuals (computed once, only on the client) ─────────────
  const ICON_FILES = [
    'typescript', 'javascript', 'react', 'nextjs', 'tailwindcss', 'nodejs',
    'python', 'rust', 'cplusplus', 'java', 'go', 'ruby',
    'postgresql', 'mongodb', 'redis', 'mysql',
    'docker', 'kubernetes', 'git', 'github', 'linux', 'bash',
    'vscode', 'figma', 'blender', 'arduino', 'raspberrypi',
    'html5', 'css3', 'vuejs', 'svelte', 'graphql',
  ];
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [starShadows, setStarShadows] = useState({ small: 'none', medium: 'none', large: 'none' });

  useEffect(() => {
    const shuffled = [...ICON_FILES].sort(() => Math.random() - 0.5);
    const icons = Array.from({ length: 28 }).map((_, i) => ({
      src: `/icons/${shuffled[i % shuffled.length]}.svg`,
      left: Math.random() * 100,
      delay: -Math.random() * 12,
      duration: 9 + Math.random() * 7,
      size: 32 + Math.random() * 18,
    }));
    setFloatingIcons(icons);

    const gen = (n) => Array.from({ length: n },
      () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`
    ).join(', ');
    setStarShadows({ small: gen(700), medium: gen(200), large: gen(100) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Typing state ───────────────────────────────────────────────────
  const [typedLines, setTypedLines] = useState([]);
  const containerRef = useRef(null);

  // Compute total characters in a line (across body + all tail segments).
  const lineLength = (line) => {
    let n = (line.t || '').length;
    if (line.tail) {
      const tails = Array.isArray(line.tail) ? line.tail : [line.tail];
      for (const seg of tails) n += (seg.text || '').length;
    }
    return n;
  };

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let timeoutId;
    const sleep = (ms) => new Promise((r) => { timeoutId = setTimeout(r, ms); });

    // Per-line baseline speed plus per-character jitter. Tuned so total
    // runtime lands around 4s for ~1500 chars while still feeling typed.
    const pickLineSpeed = () => 0.5 + Math.random() * 1.0;     // 0.5-1.5ms/char
    const charJitter = () => Math.random() * 0.8;              // +0-0.8ms

    // Mid-line hesitation: a noticeable beat at a word boundary mid-way
    // through a line, simulating a typist pausing to think. Triggers
    // probabilistically and only on lines long enough to merit one. The
    // pause is apparent (200-340ms) so it reads as a real moment of
    // hesitation, not micro-jitter. Tuned so ~2-3 hesitations occur
    // across the whole run.
    const shouldHesitate = (line, charIndex, total) => {
      if (total < 36) return false;                            // skip short lines
      if (charIndex < 12 || charIndex > total - 8) return false; // not at edges
      if (line.t && line.t[charIndex - 1] !== ' ') return false; // word boundaries only
      return Math.random() < 0.012;                             // ~1.2% per qualifying char
    };
    const hesitationDuration = () => 160 + Math.random() * 120; // 160-280ms

    // Inter-line pauses. Bigger after the typed commands (think-after),
    // tight everywhere else.
    const linePause = (line) => {
      // After a command line: simulated shell processing time
      if (line.thinkAfter) return 140 + Math.random() * 120;   // 140-260ms
      // Blank spacers: instant
      if (line.t === '' && !line.tail) return 12;
      // ~8% of body lines get a more deliberate beat
      if (Math.random() < 0.08) return 60 + Math.random() * 80;  // 60-140ms
      // Default: very snappy
      return 5 + Math.random() * 12;                             // 5-17ms
    };

    const run = async () => {
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return;
        const line = LINES[i];
        const total = lineLength(line);
        const lineSpeed = pickLineSpeed();

        // Insert empty entry — appears in DOM with prompt visible if any
        setTypedLines((prev) => [...prev, { lineIdx: i, charsTyped: 0, full: total === 0 }]);

        // Empty spacer: brief gap, move on
        if (total === 0) {
          await sleep(linePause(line));
          continue;
        }

        // Type each character. Most chars come fast; occasionally the
        // typist "pauses to think" mid-line at a word boundary, which
        // makes the sequence feel hand-typed rather than scripted.
        for (let c = 1; c <= total; c++) {
          await sleep(lineSpeed + charJitter());
          if (cancelled) return;
          setTypedLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { lineIdx: i, charsTyped: c, full: c === total };
            return next;
          });
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
          // Apparent mid-line hesitation — the noticeable "thinking"
          // stop the user wanted. Triggers at most once per line in
          // practice (probability per qualifying char × eligible chars).
          if (shouldHesitate(line, c, total)) {
            await sleep(hesitationDuration());
            if (cancelled) return;
          }
        }

        await sleep(linePause(line));
      }

      // Final hold so the visitor can read "Welcome, visitor."
      await sleep(150);
      if (!cancelled && onComplete) onComplete();
    };

    run();
    return () => { cancelled = true; clearTimeout(timeoutId); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, onComplete]);

  // Render one line, walking segments based on charsTyped budget.
  const renderLine = (entry) => {
    const line = LINES[entry.lineIdx];
    const isLast = entry === typedLines[typedLines.length - 1];
    const showCursor = isLast && !entry.full;

    if (!line.t && !line.tail && !line.p) {
      return <div key={entry.lineIdx} style={{ height: '1.85em' }}>&#160;</div>;
    }

    let remaining = entry.charsTyped;
    const segs = [];

    if (line.p) {
      segs.push(<span key="p" style={{ color: colorOf(line.pc), flexShrink: 0 }}>{line.p}</span>);
    }

    if (line.t) {
      const take = Math.min(remaining, line.t.length);
      segs.push(<span key="t" style={{ color: colorOf(line.tc) }}>{line.t.slice(0, take)}</span>);
      remaining -= take;
    }

    if (line.tail && remaining > 0) {
      const tails = Array.isArray(line.tail) ? line.tail : [line.tail];
      for (let s = 0; s < tails.length; s++) {
        if (remaining <= 0) break;
        const seg = tails[s];
        const take = Math.min(remaining, seg.text.length);
        segs.push(
          <span key={`tail-${s}`} style={{ color: colorOf(seg.cls) }}>{seg.text.slice(0, take)}</span>
        );
        remaining -= take;
      }
    }

    if (showCursor) {
      segs.push(
        <span key="cursor" style={{
          display: 'inline-block',
          width: 9,
          height: 16,
          background: 'currentColor',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'blink 0.7s infinite',
        }} />
      );
    }

    return <div key={entry.lineIdx}>{segs}</div>;
  };

  // SSR pass — render bare overlay with no random content.
  if (!mounted) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#000', zIndex: 9999,
      }} />
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadingOut ? 0 : 1,
      transition: 'opacity 0.4s ease-in-out',
      pointerEvents: fadingOut ? 'none' : 'auto',
      overflow: 'hidden',
    }}>
      <div className="loading-star loading-star-small"  style={{ boxShadow: starShadows.small }} />
      <div className="loading-star loading-star-medium" style={{ boxShadow: starShadows.medium }} />
      <div className="loading-star loading-star-large"  style={{ boxShadow: starShadows.large }} />

      {floatingIcons.map((icon, i) => (
        <img
          key={i}
          src={icon.src}
          alt=""
          aria-hidden="true"
          className="loading-floating-icon"
          style={{
            left: `${icon.left}%`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
          }}
        />
      ))}

      <div ref={containerRef} style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 920,
        height: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        textAlign: 'left',
        padding: 'clamp(2rem, 8vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
        fontFamily: '"JetBrains Mono", "Fira Code", "Geist Mono", ui-monospace, SF Mono, monospace',
        fontSize: 'clamp(12px, 1.4vw, 14px)',
        lineHeight: 1.85,
        color: C.textActive,
      }}>
        {typedLines.map((entry) => renderLine(entry))}
      </div>
    </div>
  );
}

// Renders the left-side line-number column in code-style panes.
// Width auto-sizes to digit count with a 3-char minimum, so files of
// different lengths still feel layout-stable. Font size and line height
// MUST match the content pane exactly so numbers align row-for-row.
function LineGutter({ count, paddingTop = 12 }) {
  // Minimum gutter width in "characters" (matches VS Code default of 3)
  const minDigits = 3;
  const digits = Math.max(minDigits, String(count).length);
  // Mono char width at 13px is ~7.8px. Padding both sides 8px each = 16px.
  const charWidth = 7.8;
  const width = Math.ceil(digits * charWidth) + 16;
  return (
    <div style={{
      width,
      flexShrink: 0,
      paddingTop,
      paddingRight: 8,
      paddingLeft: 8,
      paddingBottom: 24,                           // breathing room past last line
      fontFamily: 'Geist Mono, ui-monospace, monospace',
      fontSize: 13,
      lineHeight: 1.7,
      color: C.textMuted,
      textAlign: 'right',
      userSelect: 'none',
      borderRight: `1px solid ${C.border}`,
      background: C.bgEditor,
      position: 'sticky',
      left: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      // Stretch to fill the scroll container's height even when file is short,
      // so the right-border line runs all the way down like real VS Code.
      alignSelf: 'stretch',
      minHeight: '100%',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

// ── Breadcrumbs ──────────────────────────────────────────────────────────
// Thin path strip below the editor tabs, modeled after VS Code's breadcrumb
// bar. Splits the active path into segments separated by chevrons. The
// final segment shows a file icon and is colored as the active item; the
// preceding segments are folders in muted text.
function Breadcrumbs({ path }) {
  // Special-case virtual paths (panels create these, e.g. virtual:tech/react)
  let segments;
  let isVirtual = false;
  if (path.startsWith('virtual:')) {
    isVirtual = true;
    // virtual:tech/react -> ['(generated)', 'tech', 'react']
    const rest = path.slice('virtual:'.length);
    segments = ['(generated)', ...rest.split('/')];
  } else {
    segments = path.split('/');
  }
  // Detect file kind for the leaf icon
  const leaf = segments[segments.length - 1];
  const fileKind = fileKindFromPath(leaf);
  return (
    <div className="flex items-center flex-shrink-0"
         style={{
           height: 24,
           padding: '0 16px',
           background: C.bgEditor,
           borderBottom: `1px solid ${C.border}`,
           fontSize: 11.5,
           color: C.textMuted,
           fontFamily: 'Geist Mono, ui-monospace, monospace',
           gap: 6,
           whiteSpace: 'nowrap',
           overflow: 'hidden',
         }}>
      {/* Repo root */}
      <span style={{ color: C.textSecondary, flexShrink: 0 }}>mohan-lu</span>
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center flex-shrink-0" style={{ gap: 6 }}>
            <ChevronRight size={11} strokeWidth={1.5} style={{ color: C.textMuted, marginTop: 1 }} />
            {isLast ? (
              <span className="flex items-center" style={{ gap: 6 }}>
                {!isVirtual && <FileIcon kind={fileKind} />}
                <span style={{ color: C.textActive }}>{seg}</span>
              </span>
            ) : (
              <span style={{ color: C.textSecondary }}>{seg}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ── Tree row ─────────────────────────────────────────────────────────────
function TreeRow({ item, depth = 0, activePath, onOpenFile }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);
  const [hover, setHover] = useState(false);
  const isFolder = item.type === 'folder';
  const isActive = !isFolder && item.path === activePath;

  const handleClick = () => {
    if (isFolder) setOpen(!open);
    else onOpenFile(item);
  };

  // VS Code uses 8px indent per depth level. Indent guides are faint vertical
  // lines drawn at every depth boundary, helping the eye trace the hierarchy.
  const INDENT = 8;
  const baseLeft = 8;

  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="cursor-pointer select-none relative overflow-hidden"
        style={{
          height: 20,
          background: isActive ? C.bgInput : (hover ? C.bgHover : 'transparent'),
          color: isActive ? C.textActive : C.textPrimary,
        }}
      >
        {/* Indent guide lines, one for each depth level we're inside of */}
        {Array.from({ length: depth }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: baseLeft + i * INDENT + 6,
            top: 0,
            bottom: 0,
            width: 1,
            background: C.border,
            opacity: 0.6,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Active selection, a 2px accent line on the left edge of the row */}
        {isActive && (
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0, width: 2,
            background: C.accent,
            pointerEvents: 'none',
          }} />
        )}

        {/* Row content */}
        <div className="flex items-center gap-1 h-full"
             style={{ paddingLeft: baseLeft + depth * INDENT, paddingRight: 8, minWidth: 0 }}>
          {/* Chevron column (always 12px wide for alignment) */}
          <span style={{ width: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isFolder && (open
              ? <ChevronDown size={10} strokeWidth={1.7} style={{ color: C.textSecondary }} />
              : <ChevronRight size={10} strokeWidth={1.7} style={{ color: C.textSecondary }} />)}
          </span>
          {/* Icon column */}
          {isFolder
            ? (open
                ? <FolderOpen size={12} strokeWidth={1.5} style={{ color: C.synFn, flexShrink: 0 }} />
                : <Folder     size={12} strokeWidth={1.5} style={{ color: C.synFn, flexShrink: 0 }} />)
            : <FileIcon kind={item.icon} />}
          {/* Name */}
          <span style={{
            fontSize: 12,
            fontFamily: 'Geist Mono, ui-monospace, monospace',
            marginLeft: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            flex: 1,
          }}>
            {item.name}
          </span>
        </div>
      </div>
      {isFolder && open && item.children?.map((child, i) => (
        <TreeRow key={i} item={child} depth={depth + 1}
          activePath={activePath} onOpenFile={onOpenFile} />
      ))}
      {isFolder && open && item.children?.length === 0 && (
        <div style={{
          paddingLeft: baseLeft + (depth + 1) * INDENT + 22,
          fontSize: 11,
          color: C.textMuted,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          padding: '1px 0',
        }}>(empty)</div>
      )}
    </>
  );
}

// ── Activity bar icon ────────────────────────────────────────────────────
function ActIcon({ Icon, active = false, badge, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center cursor-pointer relative"
      style={{
        width: 40, height: 40,
        color: active ? C.textActive : (hover ? C.textPrimary : C.textSecondary),
        borderLeft: active ? `2px solid ${C.accent}` : '2px solid transparent',
      }}
    >
      <Icon size={20} strokeWidth={1.5} />
      {badge && (
        <span
          className="absolute rounded-full text-[9px] flex items-center justify-center font-semibold"
          style={{ background: C.accent, color: '#fff', width: 14, height: 14, top: 4, right: 4 }}
        >{badge}</span>
      )}
    </div>
  );
}

// ── Welcome pane ─────────────────────────────────────────────────────────
function WelcomePane({ onOpenFile, onFocusChat }) {
  const cards = [
    { icon: FileText, label: 'about/bio.sh', hint: 'who I am',     action: () => onOpenFile({ name: 'bio.sh',  path: 'about/bio.sh',  icon: 'bash' }) },
    { icon: Folder,   label: 'projects/flareo', hint: 'what I built', action: () => onOpenFile({ name: 'flareo.md',  path: 'projects/flareo.md', icon: 'md' }) },
    { icon: Sparkles, label: 'Ask my agent',    hint: 'natural Q&A',  action: onFocusChat },
    { icon: FileType, label: 'resume.pdf',      hint: 'download CV',  action: () => onOpenFile({ name: 'resume.pdf', path: 'about/resume.pdf', icon: 'pdf' }) },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: 0.4 }} />
      <div className="absolute pointer-events-none"
           style={{ width: 600, height: 600, background: `radial-gradient(circle, ${C.accent}15 0%, transparent 60%)`, filter: 'blur(60px)', top: '20%' }} />
      <div className="text-center relative" style={{ maxWidth: 480 }}>
        <div className="inline-flex items-center justify-center mb-6 rounded-2xl"
             style={{ width: 64, height: 64, background: C.bgInput, border: `1px solid ${C.border}` }}>
          <Sparkles size={28} strokeWidth={1.5} style={{ color: C.accent }} />
        </div>
        <h1 style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 28, fontWeight: 500, color: C.textActive, marginBottom: 8, letterSpacing: '-0.01em' }}>
          mohan-lu<span style={{ color: C.accent, animation: 'blink 1.1s infinite' }}>_</span>
        </h1>
        <p style={{ fontSize: 13, color: C.textSecondary, fontFamily: 'Geist Mono, ui-monospace, monospace', marginBottom: 32 }}>
          {"// a software engineer's portfolio, as an IDE"}
        </p>
        <div className="grid grid-cols-2 gap-2 text-left">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} onClick={card.action}
                   className="flex items-center gap-3 p-3 cursor-pointer rounded-md"
                   style={{ background: C.bgChip, border: `1px solid ${C.border}` }}
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}>
                <Icon size={16} strokeWidth={1.5} style={{ color: C.accent, flexShrink: 0 }} />
                <div className="min-w-0">
                  <div style={{ fontSize: 12, fontFamily: 'Geist Mono, ui-monospace, monospace', color: C.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.label}</div>
                  <div style={{ fontSize: 11, color: C.textSecondary }}>{card.hint}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 28, fontSize: 11, color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
          type <span style={{ color: C.synKeyword }}>{`'help'`}</span> in the terminal · or <span style={{ color: C.synKeyword }}>{'\u2318B'}</span> / <span style={{ color: C.synKeyword }}>{'\u2318J'}</span> / <span style={{ color: C.synKeyword }}>{'\u2318L'}</span> to toggle panels
        </div>
      </div>
    </div>
  );
}

// ── Markdown ─────────────────────────────────────────────────────────────
// Inline markdown, handles **bold**, *italic*, `code`, [text](url) within
// a single line. Returns an array of React nodes.
// Inline markdown, handles **bold**, *italic*, `code`, [text](url) within
// a single line. Returns an array of React nodes. Optional `ctx` enables
// extra interactive tokens used in special files like README.md:
//   [[label|path]]            opens a file when clicked, colored chip
//   [[label|path|colorKey]]   override color (palette key like 'synFn')
//   [[label|focus:chat]]      focuses the chat input on click
//   [[label|focus:terminal]]  focuses the terminal input on click
//                     inserts a blinking accent cursor
function renderInline(text, ctx = {}) {
  const parts = [];
  let remaining = text;
  let key = 0;
  while (remaining.length) {
    // Try each pattern in priority order, first match wins
    const code      = remaining.match(/^(.*?)`([^`]+)`(.*)$/);
    const bold      = remaining.match(/^(.*?)\*\*([^*]+)\*\*(.*)$/);
    const italic    = remaining.match(/^(.*?)\*([^*]+)\*(.*)$/);
    const link      = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)$/);
    const fileLink  = remaining.match(/^(.*?)\[\[([^\]|]+)\|([^\]|]+)(?:\|([^\]]+))?\]\](.*)$/);
    const colorTok  = remaining.match(/^(.*?)\{c:([a-zA-Z]+):([^}]+)\}(.*)$/);

    // Find which pattern's prefix is shortest (i.e., earliest in remaining)
    const candidates = [
      fileLink  && { kind: 'fileLink', m: fileLink },
      colorTok  && { kind: 'color',    m: colorTok },
      code      && { kind: 'code',     m: code },
      bold      && { kind: 'bold',     m: bold },
      italic    && { kind: 'italic',   m: italic },
      link      && { kind: 'link',     m: link },
    ].filter(Boolean);

    if (!candidates.length) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    candidates.sort((a, b) => a.m[1].length - b.m[1].length);
    const winner = candidates[0];

    if (winner.m[1]) parts.push(<span key={key++}>{winner.m[1]}</span>);

    if (winner.kind === 'fileLink') {
      const [, , label, target, colorKey] = winner.m;
      const color = (colorKey && C[colorKey]) || C.accent;
      const isFocus = target.startsWith('focus:');
      const handle = () => {
        if (isFocus) {
          const what = target.slice(6); // 'chat' or 'terminal'
          if (what === 'chat' && ctx.onFocusChat) ctx.onFocusChat();
          else if (what === 'terminal' && ctx.onFocusTerminal) ctx.onFocusTerminal();
        } else if (ctx.onOpenFile) {
          ctx.onOpenFile({ name: target.split('/').pop(), path: target, icon: fileKindFromPath(target) });
        }
      };
      parts.push(
        <span key={key++} onClick={handle}
              style={{
                color,
                cursor: 'pointer',
                background: `${color}14`,                       // 8% alpha behind the chip
                padding: '0 5px',
                borderRadius: 3,
                fontWeight: 500,
                borderBottom: `1px dashed ${color}66`,
                transition: 'background 80ms',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = `${color}28`}
              onMouseLeave={(e) => e.currentTarget.style.background = `${color}14`}>
          {label}
        </span>
      );
      remaining = winner.m[5];
    } else if (winner.kind === 'color') {
      const [, , colorKey, content] = winner.m;
      const color = C[colorKey] || C.textPrimary;
      parts.push(<span key={key++} style={{ color }}>{content}</span>);
      remaining = winner.m[4];
    } else if (winner.kind === 'code') {
      parts.push(<code key={key++} style={{
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        background: C.bgInput,
        color: C.synString,
        padding: '1px 6px',
        borderRadius: 3,
        fontSize: '0.92em',
        border: `1px solid ${C.border}`,
      }}>{winner.m[2]}</code>);
      remaining = winner.m[3];
    } else if (winner.kind === 'bold') {
      parts.push(<strong key={key++} style={{ color: C.textActive, fontWeight: 600 }}>{winner.m[2]}</strong>);
      remaining = winner.m[3];
    } else if (winner.kind === 'italic') {
      parts.push(<em key={key++} style={{ color: C.synString }}>{winner.m[2]}</em>);
      remaining = winner.m[3];
    } else if (winner.kind === 'link') {
      parts.push(<a key={key++} href={winner.m[3]} target="_blank" rel="noopener noreferrer"
                    style={{ color: C.accent, textDecoration: 'none', borderBottom: `1px dashed ${C.accent}` }}
                    onMouseEnter={(e) => e.currentTarget.style.borderBottomStyle = 'solid'}
                    onMouseLeave={(e) => e.currentTarget.style.borderBottomStyle = 'dashed'}>
        {winner.m[2]}
      </a>);
      remaining = winner.m[4];
    }
  }
  return parts;
}

// Block-level markdown renderer. Supports headers (# ## ###), fenced code
// blocks (```lang ... ```), bullet lists, blockquotes (>), horizontal rules
// (---), paragraphs, and inline formatting via renderInline.
function MarkdownPane({ body, path, onOpenFile, onFocusChat, onFocusTerminal }) {
  const lines = body.split('\n');
  const blocks = [];
  let i = 0;

  // Pass 1: parse into blocks (consume multi-line constructs like code fences)
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block ``` lang
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ kind: 'codeblock', lang, code: codeLines.join('\n') });
      continue;
    }

    // Headers
    if (line.startsWith('### ')) { blocks.push({ kind: 'h3', text: line.slice(4) }); i++; continue; }
    if (line.startsWith('## '))  { blocks.push({ kind: 'h2', text: line.slice(3) }); i++; continue; }
    if (line.startsWith('# '))   { blocks.push({ kind: 'h1', text: line.slice(2) }); i++; continue; }

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '___') { blocks.push({ kind: 'hr' }); i++; continue; }

    // Blockquote, consume consecutive `>` lines
    if (line.startsWith('> ')) {
      const quoted = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoted.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ kind: 'quote', text: quoted.join(' ') });
      continue;
    }

    // Bullet
    if (line.startsWith('- ')) { blocks.push({ kind: 'li', text: line.slice(2) }); i++; continue; }

    // Empty line
    if (line.trim() === '') { blocks.push({ kind: 'space' }); i++; continue; }

    // Default, paragraph line
    blocks.push({ kind: 'p', text: line });
    i++;
  }

  // Light syntax highlighter for code blocks. Recognizes a few common token
  // types (strings, comments, keywords, numbers) and colors them. Not a full
  // tokenizer, just enough that code blocks don't read as flat gray text.
  const highlightCode = (code, lang) => {
    if (!code) return code;
    const tokens = [];
    let buf = '';
    let mode = 'code';
    let i = 0;
    const push = (text, color) => { if (text) tokens.push({ text, color }); };

    const keywordSet = new Set([
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class',
      'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw',
      'new', 'this', 'extends', 'static', 'true', 'false', 'null', 'undefined',
      'def', 'in', 'is', 'and', 'or', 'not', 'lambda', 'with', 'as', 'pass', 'self',
      'public', 'private', 'void', 'int', 'float', 'double', 'char', 'bool', 'string',
      'struct', 'typedef', 'unsigned', 'auto',
    ]);

    while (i < code.length) {
      const c = code[i];
      // Line comment
      if (mode === 'code' && c === '/' && code[i+1] === '/') {
        push(buf, C.textPrimary); buf = '';
        let j = i;
        while (j < code.length && code[j] !== '\n') j++;
        push(code.slice(i, j), C.synComment);
        i = j;
        continue;
      }
      // Hash comment (Python-ish)
      if (mode === 'code' && c === '#') {
        push(buf, C.textPrimary); buf = '';
        let j = i;
        while (j < code.length && code[j] !== '\n') j++;
        push(code.slice(i, j), C.synComment);
        i = j;
        continue;
      }
      // String
      if (mode === 'code' && (c === '"' || c === "'" || c === '`')) {
        push(buf, C.textPrimary); buf = '';
        const quote = c;
        let j = i + 1;
        while (j < code.length && code[j] !== quote) {
          if (code[j] === '\\') j++;
          j++;
        }
        push(code.slice(i, j + 1), C.synString);
        i = j + 1;
        continue;
      }
      // Number
      if (mode === 'code' && /[0-9]/.test(c) && !/[a-zA-Z_]/.test(code[i-1] || '')) {
        push(buf, C.textPrimary); buf = '';
        let j = i;
        while (j < code.length && /[0-9._x]/.test(code[j])) j++;
        push(code.slice(i, j), C.synFn);
        i = j;
        continue;
      }
      // Identifier, check for keyword
      if (mode === 'code' && /[a-zA-Z_]/.test(c)) {
        push(buf, C.textPrimary); buf = '';
        let j = i;
        while (j < code.length && /[a-zA-Z_0-9]/.test(code[j])) j++;
        const ident = code.slice(i, j);
        push(ident, keywordSet.has(ident) ? C.synKeyword : C.textPrimary);
        i = j;
        continue;
      }
      buf += c;
      i++;
    }
    push(buf, C.textPrimary);
    return tokens.map((t, k) => <span key={k} style={{ color: t.color }}>{t.text}</span>);
  };

  // Find the index of the first paragraph (for "lead" styling), first 'p'
  // block after any leading h1/space blocks gets a slightly larger, brighter
  // treatment, like the lede in a real article.
  const firstParagraphIdx = (() => {
    for (let k = 0; k < blocks.length; k++) {
      if (blocks[k].kind === 'p') return k;
    }
    return -1;
  })();

  // Context passed to renderInline for interactive tokens like [[label|path]]
  const ctx = { onOpenFile, onFocusChat, onFocusTerminal };

  return (
    <div style={{
      padding: '0 0 48px 0',
      width: '100%',
      maxWidth: 760,
      // intentionally NOT centered, sits left like a real .md in an editor
      fontSize: 14,
      lineHeight: 1.65,
      color: C.textPrimary,
      fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
    }}>
      <div style={{ padding: '32px 40px 0' }}>
      {blocks.map((b, idx) => {
        if (b.kind === 'h1') {
          // If the H1 contains color tokens, treat it as a code-declaration
          // and render in monospace for proper "this is code" feel.
          const isCodeStyle = b.text.includes('{c:');
          return <h1 key={idx} style={{
            fontSize: isCodeStyle ? 28 : 32,
            color: C.textActive,
            fontWeight: isCodeStyle ? 500 : 700,
            marginBottom: 8,
            marginTop: idx ? 24 : 0,
            letterSpacing: isCodeStyle ? '-0.005em' : '-0.025em',
            lineHeight: 1.2,
            fontFamily: isCodeStyle ? 'Geist Mono, ui-monospace, monospace' : 'inherit',
          }}>{renderInline(b.text, ctx)}</h1>;
        }
        if (b.kind === 'h2') return <h2 key={idx} style={{ fontSize: 20, color: C.textActive, fontWeight: 600, marginBottom: 8, marginTop: 22, paddingBottom: 6, borderBottom: `1px solid ${C.border}`, letterSpacing: '-0.012em' }}>{renderInline(b.text, ctx)}</h2>;
        if (b.kind === 'h3') return <h3 key={idx} style={{ fontSize: 13, color: C.textSecondary, fontWeight: 600, marginBottom: 6, marginTop: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{renderInline(b.text, ctx)}</h3>;
        if (b.kind === 'hr') return <hr key={idx} style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '16px 0' }} />;
        if (b.kind === 'quote') return (
          <blockquote key={idx} style={{
            borderLeft: `3px solid ${C.accent}`,
            margin: '10px 0',
            color: C.textPrimary,
            background: C.bgInput,
            padding: '12px 16px',
            borderRadius: '0 6px 6px 0',
            fontSize: 14,
            lineHeight: 1.6,
          }}>
            {renderInline(b.text, ctx)}
          </blockquote>
        );
        if (b.kind === 'codeblock') return (
          <div key={idx} style={{
            background: C.bgEditor,
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            margin: '10px 0',
            overflow: 'hidden',
          }}>
            {b.lang && (
              <div style={{
                background: C.bgInput,
                borderBottom: `1px solid ${C.border}`,
                padding: '5px 14px',
                fontSize: 11,
                color: C.textSecondary,
                fontFamily: 'Geist Mono, ui-monospace, monospace',
                letterSpacing: '0.05em',
              }}>{b.lang}</div>
            )}
            <pre style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace',
              fontSize: 13,
              lineHeight: 1.6,
              color: C.textPrimary,
              padding: 14,
              margin: 0,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}>{highlightCode(b.code, b.lang)}</pre>
          </div>
        );
        if (b.kind === 'li')   return <div key={idx} style={{ paddingLeft: 22, position: 'relative', marginBottom: 4 }}><span style={{ position: 'absolute', left: 4, top: 1, color: C.accent, fontWeight: 700 }}>›</span>{renderInline(b.text, ctx)}</div>;
        if (b.kind === 'space') return <div key={idx} style={{ height: 4 }} />;
        // Lead paragraph, first paragraph gets slightly larger / brighter treatment
        if (idx === firstParagraphIdx) {
          return <p key={idx} style={{ marginBottom: 10, fontSize: 15.5, color: C.textActive, lineHeight: 1.55 }}>{renderInline(b.text, ctx)}</p>;
        }
        return <p key={idx} style={{ marginBottom: 8 }}>{renderInline(b.text, ctx)}</p>;
      })}
      </div>
    </div>
  );
}

// ── JSON ─────────────────────────────────────────────────────────────────
function renderJson(value, indent) {
  if (value === null) return <span style={{ color: C.synKeyword }}>null</span>;
  if (typeof value === 'boolean') return <span style={{ color: C.synKeyword }}>{String(value)}</span>;
  if (typeof value === 'number')  return <span style={{ color: C.synFn }}>{value}</span>;
  if (typeof value === 'string')  return <span style={{ color: C.synString }}>{`"${value}"`}</span>;
  if (Array.isArray(value)) {
    if (!value.length) return <span style={{ color: C.textPrimary }}>[]</span>;
    return (
      <>
        <span style={{ color: C.textPrimary }}>[</span>
        {value.map((v, i) => (
          <div key={i} style={{ paddingLeft: (indent + 1) * 16 }}>
            {renderJson(v, indent + 1)}{i < value.length - 1 && <span style={{ color: C.textPrimary }}>,</span>}
          </div>
        ))}
        <div style={{ paddingLeft: indent * 16 }}><span style={{ color: C.textPrimary }}>]</span></div>
      </>
    );
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return (
      <>
        <span style={{ color: C.textPrimary }}>{'{'}</span>
        {keys.map((k, i) => (
          <div key={k} style={{ paddingLeft: (indent + 1) * 16 }}>
            <span style={{ color: C.synAttr }}>{`"${k}"`}</span><span style={{ color: C.textPrimary }}>: </span>{renderJson(value[k], indent + 1)}{i < keys.length - 1 && <span style={{ color: C.textPrimary }}>,</span>}
          </div>
        ))}
        <div style={{ paddingLeft: indent * 16 }}><span style={{ color: C.textPrimary }}>{'}'}</span></div>
      </>
    );
  }
  return null;
}

function JsonPane({ body }) {
  // Count rendered lines by structure traversal — matches what renderJson outputs
  const countLines = (v) => {
    if (v === null || typeof v !== 'object') return 1;
    if (Array.isArray(v)) {
      if (!v.length) return 1;
      return 2 + v.reduce((s, x) => s + countLines(x), 0); // [ + items + ]
    }
    const keys = Object.keys(v);
    if (!keys.length) return 1;
    return 2 + keys.reduce((s, k) => s + countLines(v[k]), 0); // { + entries + }
  };
  const lineCount = countLines(body);
  return (
    <div className="flex h-full overflow-auto">
      <LineGutter count={lineCount} />
      <div className="py-3" style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre', paddingLeft: 12, paddingRight: 24 }}>
        {renderJson(body, 0)}
      </div>
    </div>
  );
}

// ── PDF preview pane ─────────────────────────────────────────────────────
function PdfPane() {
  return (
    <div className="w-full h-full flex flex-col items-center" style={{ background: C.bgTab, overflow: 'auto', padding: 24 }}>
      <div className="flex items-center justify-between" style={{ width: '100%', maxWidth: 720, marginBottom: 16, gap: 12 }}>
        <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Geist Mono, ui-monospace, monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>resume.pdf · 1 of 1</div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer flex-shrink-0"
                style={{ background: C.accent, color: '#fff', fontSize: 12, border: 'none' }}>
          <Download size={13} strokeWidth={1.5} /> Download
        </button>
      </div>
      <div className="shadow-xl pdf-preview"
           style={{
             width: '100%',
             maxWidth: 720,
             background: '#fafafa',
             color: '#222',
             minHeight: 600,
             padding: '60px 80px',
             fontFamily: 'Georgia, serif',
             boxSizing: 'border-box',
           }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Mohan Lu</h1>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 28 }}>Software Engineer · NYU Tandon · mohan@example.com</div>
        <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 12, marginTop: 24 }}>Education</h2>
        <div style={{ fontSize: 14, marginBottom: 16 }}>
          <strong>NYU Tandon School of Engineering</strong> · 2023 to 2027<br />
          B.S. Computer Science
        </div>
        <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 12 }}>Projects</h2>
        <div style={{ fontSize: 14, marginBottom: 8 }}><strong>Flareo</strong>, full-stack pipeline, TypeScript / Postgres / R2</div>
        <div style={{ fontSize: 14, marginBottom: 8 }}><strong>Particle Canvas</strong>, interactive WebGL particle system</div>
        <div style={{ fontSize: 14, marginBottom: 16 }}><strong>Arduino Rover</strong>, autonomous rover with ROS</div>
        <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 12 }}>Skills</h2>
        <div style={{ fontSize: 14 }}>TypeScript, Python, C++, React, Node.js, PostgreSQL, Docker, ROS, Blender</div>
      </div>
    </div>
  );
}

// ── Dotfile pane ─────────────────────────────────────────────────────────
function DotfilePane({ body }) {
  const lines = body.split('\n');
  return (
    <div className="flex h-full overflow-auto">
      <LineGutter count={lines.length} />
      <div className="py-3" style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre', paddingLeft: 12, paddingRight: 24 }}>
        {lines.map((line, i) => {
          if (line.startsWith('#')) return <div key={i} style={{ color: C.synComment }}>{line || '\u00A0'}</div>;
          const m = line.match(/^(export\s+|alias\s+)?([A-Za-z_][A-Za-z_0-9-]*)(=)(.*)$/);
          if (m) {
            return (
              <div key={i}>
                {m[1] && <span style={{ color: C.synKeyword }}>{m[1]}</span>}
                <span style={{ color: C.synType }}>{m[2]}</span>
                <span style={{ color: C.textPrimary }}>{m[3]}</span>
                <span style={{ color: C.synString }}>{m[4]}</span>
              </div>
            );
          }
          return <div key={i} style={{ color: C.textPrimary }}>{line || '\u00A0'}</div>;
        })}
      </div>
    </div>
  );
}

// YAML renderer, colors keys, strings, numbers, booleans, lists, and
// inline comments. Tolerant of common YAML, we're not parsing, just
// pattern-matching for syntax highlighting.
function YamlPane({ body }) {
  const renderValue = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return <span style={{ color: C.textPrimary }}>{val}</span>;

    // Detect inline comments and split them out
    let valuePart = trimmed;
    let comment = '';
    const commentIdx = trimmed.indexOf(' #');
    if (commentIdx > 0) {
      valuePart = trimmed.slice(0, commentIdx);
      comment = trimmed.slice(commentIdx);
    }

    let coloredValue;
    if (/^(true|false|null|~)$/i.test(valuePart)) {
      coloredValue = <span style={{ color: C.synKeyword }}>{valuePart}</span>;
    } else if (/^-?\d+(\.\d+)?$/.test(valuePart)) {
      coloredValue = <span style={{ color: C.synFn }}>{valuePart}</span>;
    } else if (/^["'].*["']$/.test(valuePart)) {
      coloredValue = <span style={{ color: C.synString }}>{valuePart}</span>;
    } else if (/^\[.*\]$/.test(valuePart) || /^\{.*\}$/.test(valuePart)) {
      coloredValue = <span style={{ color: C.synString }}>{valuePart}</span>;
    } else {
      coloredValue = <span style={{ color: C.synString }}>{valuePart}</span>;
    }

    // Preserve leading whitespace
    const leading = val.match(/^\s*/)[0];
    return (
      <>
        <span>{leading}</span>
        {coloredValue}
        {comment && <span style={{ color: C.synComment }}>{comment}</span>}
      </>
    );
  };

  return (
    <div className="flex h-full overflow-auto">
      <LineGutter count={body.split('\n').length} />
      <div className="py-3" style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre', paddingLeft: 12, paddingRight: 24 }}>
      {body.split('\n').map((line, i) => {
        // Whole-line comments
        if (line.trim().startsWith('#')) {
          return <div key={i} style={{ color: C.synComment }}>{line}</div>;
        }
        // Empty line, preserve height
        if (line.trim() === '') return <div key={i} style={{ minHeight: '1em' }}>{'\u00A0'}</div>;

        // Match `[indent][- ][key:][value]` patterns
        // List item with key+value: "  - name: foo"
        const listKv = line.match(/^(\s*)(- )([A-Za-z_][A-Za-z_0-9-]*)(:)(.*)$/);
        if (listKv) {
          return (
            <div key={i}>
              <span>{listKv[1]}</span>
              <span style={{ color: C.accent }}>{listKv[2]}</span>
              <span style={{ color: C.synAttr }}>{listKv[3]}</span>
              <span style={{ color: C.textPrimary }}>{listKv[4]}</span>
              {renderValue(listKv[5])}
            </div>
          );
        }
        // Plain list item: "  - foo"
        const listItem = line.match(/^(\s*)(- )(.*)$/);
        if (listItem) {
          return (
            <div key={i}>
              <span>{listItem[1]}</span>
              <span style={{ color: C.accent }}>{listItem[2]}</span>
              {renderValue(listItem[3])}
            </div>
          );
        }
        // Key: value
        const kv = line.match(/^(\s*)([A-Za-z_][A-Za-z_0-9-]*)(:)(.*)$/);
        if (kv) {
          return (
            <div key={i}>
              <span>{kv[1]}</span>
              <span style={{ color: C.synAttr }}>{kv[2]}</span>
              <span style={{ color: C.textPrimary }}>{kv[3]}</span>
              {renderValue(kv[4])}
            </div>
          );
        }
        return <div key={i} style={{ color: C.textPrimary }}>{line || '\u00A0'}</div>;
      })}
      </div>
    </div>
  );
}

// ── Bash pane ────────────────────────────────────────────────────────────
// Renders shell scripts with simple syntax highlighting. Recognizes:
//   - shebang lines (#!/...)
//   - comments (# ...)
//   - shell builtins (echo, export, alias, if, then, fi, etc.)
//   - strings ("..." and '...')
//   - variables ($VAR, ${VAR})
//   - command substitution ($(...))
//   - operators (=, |, >, etc.)
function BashPane({ body }) {
  const lines = body.split('\n');

  const BASH_KEYWORDS = new Set([
    'echo', 'printf', 'export', 'alias', 'cd', 'ls', 'cat', 'grep', 'awk', 'sed',
    'if', 'then', 'else', 'elif', 'fi', 'for', 'in', 'do', 'done', 'while',
    'case', 'esac', 'function', 'return', 'exit', 'source', 'read', 'set',
    'unset', 'local', 'declare', 'true', 'false', 'test',
  ]);

  const renderLine = (line) => {
    if (!line.trim()) return <span>{'\u00A0'}</span>;

    // Shebang
    if (line.startsWith('#!')) {
      return <span style={{ color: C.synComment, fontStyle: 'italic' }}>{line}</span>;
    }
    // Whole-line comment
    if (line.trimStart().startsWith('#')) {
      return <span style={{ color: C.synComment }}>{line}</span>;
    }

    // Token-based pass: walk through and emit colored spans
    const tokens = [];
    let buf = '';
    let i = 0;
    let tokenKey = 0;
    const flush = (color) => {
      if (buf) {
        tokens.push(<span key={tokenKey++} style={{ color }}>{buf}</span>);
        buf = '';
      }
    };

    while (i < line.length) {
      const c = line[i];

      // String (double or single quotes)
      if (c === '"' || c === "'") {
        flush(C.textPrimary);
        const quote = c;
        let j = i + 1;
        while (j < line.length && line[j] !== quote) {
          if (line[j] === '\\') j++;
          j++;
        }
        const str = line.slice(i, Math.min(j + 1, line.length));
        tokens.push(<span key={tokenKey++} style={{ color: C.synString }}>{str}</span>);
        i = j + 1;
        continue;
      }

      // Variable expansion: ${VAR} or $VAR or $(...)
      if (c === '$') {
        flush(C.textPrimary);
        if (line[i + 1] === '(') {
          // command substitution
          let depth = 1; let j = i + 2;
          while (j < line.length && depth > 0) {
            if (line[j] === '(') depth++;
            else if (line[j] === ')') depth--;
            j++;
          }
          tokens.push(<span key={tokenKey++} style={{ color: C.synFn }}>{line.slice(i, j)}</span>);
          i = j;
          continue;
        }
        if (line[i + 1] === '{') {
          let j = i + 2;
          while (j < line.length && line[j] !== '}') j++;
          tokens.push(<span key={tokenKey++} style={{ color: C.synAttr }}>{line.slice(i, j + 1)}</span>);
          i = j + 1;
          continue;
        }
        let j = i + 1;
        while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
        tokens.push(<span key={tokenKey++} style={{ color: C.synAttr }}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      // Inline comment after content (# at word boundary)
      if (c === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
        flush(C.textPrimary);
        tokens.push(<span key={tokenKey++} style={{ color: C.synComment }}>{line.slice(i)}</span>);
        i = line.length;
        continue;
      }

      // Identifier — check for keyword
      if (/[A-Za-z_]/.test(c)) {
        let j = i;
        while (j < line.length && /[A-Za-z0-9_-]/.test(line[j])) j++;
        const ident = line.slice(i, j);
        if (BASH_KEYWORDS.has(ident)) {
          flush(C.textPrimary);
          tokens.push(<span key={tokenKey++} style={{ color: C.synKeyword }}>{ident}</span>);
        } else {
          buf += ident;
        }
        i = j;
        continue;
      }

      // Operators
      if ('=|&><;'.includes(c)) {
        flush(C.textPrimary);
        tokens.push(<span key={tokenKey++} style={{ color: C.synFn }}>{c}</span>);
        i++;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(c)) {
        flush(C.textPrimary);
        let j = i;
        while (j < line.length && /[0-9.]/.test(line[j])) j++;
        tokens.push(<span key={tokenKey++} style={{ color: C.synFn }}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      buf += c;
      i++;
    }
    flush(C.textPrimary);
    return tokens;
  };

  return (
    <div className="flex h-full overflow-auto">
      <LineGutter count={lines.length} />
      <div className="py-3" style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre', paddingLeft: 12, paddingRight: 24 }}>
        {lines.map((line, i) => (
          <div key={i}>{renderLine(line)}</div>
        ))}
      </div>
    </div>
  );
}

// ── Output pane (bottom panel "Output" tab) ──────────────────────────────
// Real activity log driven by site events, file opens, chat messages,
// terminal commands. Scrolls newest-to-bottom like a tail. Each line shows
// a timestamp, a colored source tag, and the message itself.
function OutputPane({ log }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [log]);

  // Source-specific tag colors so visitors can scan by category
  const sourceColor = {
    system:   C.textMuted,
    editor:   C.synType,    // sky blue
    chat:     C.synFn,      // peach
    terminal: C.synKeyword, // mint
    panel:    C.synAttr,    // lavender
  };

  const formatTs = (d) => {
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div ref={scrollRef}
         className="flex-1 px-3 py-2 overflow-auto"
         style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 12, lineHeight: 1.6 }}>
      {log.length === 0 ? (
        <div style={{ color: C.textMuted, fontStyle: 'italic' }}>{'// no activity yet'}</div>
      ) : (
        log.map((entry, i) => (
          <div key={i} className="flex" style={{ gap: 8 }}>
            <span style={{ color: C.textMuted, flexShrink: 0 }}>{formatTs(entry.ts)}</span>
            <span style={{
              color: sourceColor[entry.source] || C.textSecondary,
              flexShrink: 0,
              minWidth: 64,
            }}>[{entry.source}]</span>
            <span style={{ color: entry.level === 'error' ? C.err : C.textPrimary }}>
              {entry.text}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

// ── Ports pane (bottom panel "Ports" tab) ────────────────────────────────
// VS Code's PORTS tab usually shows forwarded localhost ports. Here it's
// repurposed as a directory of Mohan's real online endpoints, each row
// is clickable, opens externally. Functions as a fast contact panel.
function PortsPane({ pushOutput }) {
  // Each "port" maps a local-feeling identifier to a real external URL.
  // Status colors signal the kind: green = active, blue = informational,
  // muted = future / placeholder.
  const ports = [
    { port: '443',  label: 'github.com/mohanlu',       url: 'https://github.com/mohanlu',         desc: 'source code',            status: 'active'  },
    { port: '443',  label: 'linkedin.com/in/mohan-lu', url: 'https://linkedin.com/in/mohan-lu',   desc: 'professional',           status: 'active'  },
    { port: '443',  label: 'cal.com/mohanlu',          url: 'https://cal.com/mohanlu',            desc: 'schedule a 15-min chat', status: 'active'  },
    { port: '25',   label: 'mohan@example.com',        url: 'mailto:mohan@example.com',           desc: 'email · ~4hr response',  status: 'active'  },
    { port: '8080', label: '/api/chat',                url: null,                                 desc: 'assistant endpoint',     status: 'mock'    },
    { port: '8081', label: '/resume.pdf',              url: null,                                 desc: 'cv download',            status: 'planned' },
  ];

  const statusColor = (s) =>
    s === 'active' ? C.ok :
    s === 'mock'   ? C.warn :
                     C.textMuted;
  const statusLabel = (s) =>
    s === 'active' ? 'open' :
    s === 'mock'   ? 'mock' :
                     'soon';

  const handleClick = (p) => {
    if (!p.url) return;
    pushOutput('panel', `forwarding to ${p.label}`);
    window.open(p.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 overflow-auto px-3 py-2"
         style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 12, lineHeight: 1.5 }}>
      {/* Header row */}
      <div className="flex" style={{
        gap: 12,
        color: C.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: 10,
        paddingBottom: 6,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <span style={{ width: 56,  flexShrink: 0 }}>Port</span>
        <span style={{ width: 250, flexShrink: 0 }}>Endpoint</span>
        <span style={{ width: 56,  flexShrink: 0 }}>Status</span>
        <span style={{ flex: 1 }}>Description</span>
      </div>
      {ports.map((p, i) => (
        <div key={i}
             onClick={() => handleClick(p)}
             onMouseEnter={(e) => { if (p.url) e.currentTarget.style.background = C.bgHover; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
             className="flex items-center"
             style={{
               gap: 12,
               padding: '6px 0',
               cursor: p.url ? 'pointer' : 'default',
               color: C.textPrimary,
               transition: 'background 80ms',
               borderBottom: `1px solid ${C.bgHover}`,
             }}>
          <span style={{ width: 56, flexShrink: 0, color: C.synFn }}>{p.port}</span>
          <span style={{
            width: 250, flexShrink: 0,
            color: p.url ? C.accent : C.textSecondary,
          }}>
            {p.label}
          </span>
          <span className="flex items-center" style={{ width: 56, flexShrink: 0, gap: 5 }}>
            <Circle size={7} fill={statusColor(p.status)} strokeWidth={0} />
            <span style={{ color: statusColor(p.status), fontSize: 11 }}>{statusLabel(p.status)}</span>
          </span>
          <span style={{ flex: 1, color: C.textSecondary }}>{p.desc}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 11, color: C.textMuted, fontStyle: 'italic' }}>
        {'// click any active row to open in a new tab'}
      </div>
    </div>
  );
}

// ── Editor router ────────────────────────────────────────────────────────
function EditorContent({ path, onOpenFile, onFocusChat, onFocusTerminal }) {
  // Virtual paths (generated content from side panels), handled separately
  if (path && path.startsWith('virtual:')) {
    return <VirtualPane path={path} onOpenFile={onOpenFile} />;
  }

  const file = path ? FILE_CONTENT[path] : null;
  // Welcome pane temporarily disabled, re-enable by swapping placeholder for <WelcomePane ... /> below
  if (!file)                     return <PlaceholderPane />;
  if (file.kind === 'welcome')   return <PlaceholderPane />;
  if (file.kind === 'markdown')  return <div className="overflow-auto h-full"><MarkdownPane body={file.body} path={path} onOpenFile={onOpenFile} onFocusChat={onFocusChat} onFocusTerminal={onFocusTerminal} /></div>;
  if (file.kind === 'json')      return <JsonPane body={file.body} />;
  if (file.kind === 'pdf')       return <PdfPane />;
  if (file.kind === 'dotfile')   return <DotfilePane body={file.body} />;
  if (file.kind === 'yaml')      return <YamlPane body={file.body} />;
  if (file.kind === 'bash')      return <BashPane body={file.body} />;
  return null;
}

// Quiet empty-state placeholder used while the welcome pane is disabled.
function PlaceholderPane() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ color: C.textMuted, fontSize: 12, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
      {'// welcome pane temporarily disabled'}
    </div>
  );
}

// ── Virtual content registry ─────────────────────────────────────────────
// Generated content for side-panel items that don't map to real files in
// the tree. Each entry has a path like 'virtual:tech/typescript' and a
// kind ('tech' | 'achievement' | 'milestone') that determines rendering.
const VIRTUAL_CONTENT = {
  // ─── Tech stack details ─────────────────────────────────────────────────
  'virtual:tech/typescript': {
    kind: 'tech',
    title: 'TypeScript',
    status: 'daily',
    stars: 5,
    category: 'Languages',
    desc: 'Main language for everything web. Type system goes brrr.',
    sections: [
      { heading: 'Where I use it', body: "Frontend (React + Next.js), backend services, Cloudflare Worker code, build tooling, data scripts. If it touches the web, it's probably TS." },
      { heading: 'Opinions', body: "Strict mode always. Generics over `any`. Discriminated unions for state machines. The cost of `any` compounds, I'd rather spend 10 minutes on a type than 10 hours on a runtime bug." },
      { heading: 'Projects using it', body: 'Flareo, this portfolio site, particle-canvas, internal tooling.', files: [{ path: 'projects/flareo.md', icon: 'md' }, { path: 'projects/particle-canvas.md', icon: 'md' }] },
    ],
  },
  'virtual:tech/python': {
    kind: 'tech',
    title: 'Python',
    status: 'daily',
    stars: 5,
    category: 'Languages',
    desc: 'Data, ML, scripting, and quick prototypes.',
    sections: [
      { heading: 'Where I use it', body: 'NumPy + Pandas for data analysis, PyTorch for ML coursework, Flask/FastAPI for quick backend prototypes, scripting that touches files or APIs.' },
      { heading: 'Opinions', body: 'Type hints + ruff in every project. Avoid `*args, **kwargs` unless writing a library. Async is fine when justified, sync when not.' },
    ],
  },
  'virtual:tech/cplusplus': {
    kind: 'tech',
    title: 'C++',
    status: 'active',
    stars: 4,
    category: 'Languages',
    desc: 'Embedded firmware and performance-critical code.',
    sections: [
      { heading: 'Where I use it', body: 'Arduino firmware, embedded controllers, occasional perf-critical hot paths in larger systems.' },
      { heading: 'Projects', body: 'Arduino rover firmware, sensor calibration code.', files: [{ path: 'projects/arduino-rover.md', icon: 'md' }] },
    ],
  },
  'virtual:tech/java': {
    kind: 'tech', title: 'Java', status: 'occasional', stars: 4, category: 'Languages',
    desc: 'CS coursework foundation + Android side projects.',
    sections: [{ heading: 'Where I use it', body: 'Most of my CS coursework was Java-first. Comfortable with Spring, JUnit, and the broader JVM ecosystem.' }],
  },
  'virtual:tech/rust': {
    kind: 'tech', title: 'Rust', status: 'learning', stars: 2, category: 'Languages',
    desc: 'Working through the book on weekends.',
    sections: [{ heading: 'Status', body: 'Ownership is starting to make sense. Have written some toy CLIs and HTTP servers. Want to ship something real this year.' }],
  },
  'virtual:tech/react': {
    kind: 'tech', title: 'React', status: 'daily', stars: 5, category: 'Web',
    desc: 'My default UI framework, components, hooks, the works.',
    sections: [
      { heading: 'Style', body: 'Function components + hooks. Heavy use of useReducer for complex state. Avoid prop-drilling with context where it makes sense.' },
      { heading: 'Projects', body: 'This site, internal tooling, particle-canvas viewer.' },
    ],
  },
  'virtual:tech/nextjs': {
    kind: 'tech', title: 'Next.js', status: 'active', stars: 4, category: 'Web',
    desc: 'SSR + edge-rendered apps when SEO and speed both matter.',
    sections: [{ heading: 'Where I use it', body: 'App router for new projects. SSR for marketing pages, RSC for data-heavy views. Vercel or Cloudflare Pages depending on the project.' }],
  },
  'virtual:tech/tailwind': {
    kind: 'tech', title: 'Tailwind', status: 'daily', stars: 5, category: 'Web',
    desc: 'Utility-first CSS, fast iteration without leaving the JSX.',
    sections: [{ heading: 'Style', body: 'Tailwind for utility, plain CSS for animations or anything with @keyframes / @container queries. Resist the urge to extract too early.' }],
  },
  'virtual:tech/cloudflare-workers': {
    kind: 'tech', title: 'Cloudflare Workers', status: 'active', stars: 4, category: 'Web',
    desc: 'Edge runtime. Flareo runs here.',
    sections: [
      { heading: 'Why', body: 'Cold starts measured in milliseconds, global edge deployment by default, R2 + KV + D1 in the same ecosystem. Good fit for async pipelines like Flareo.' },
      { heading: 'Projects', body: 'Flareo full-stack worker pipeline.', files: [{ path: 'projects/flareo.md', icon: 'md' }] },
    ],
  },
  'virtual:tech/postgresql': {
    kind: 'tech', title: 'PostgreSQL', status: 'active', stars: 4, category: 'Data',
    desc: 'Primary relational store for serious projects.',
    sections: [{ heading: 'Comfort', body: 'Schema design, indexing, JSONB columns, FTS. Not a DBA but enough to ship.' }],
  },
  'virtual:tech/mongodb': {
    kind: 'tech', title: 'MongoDB', status: 'occasional', stars: 3, category: 'Data',
    desc: 'When the data is genuinely document-shaped.',
    sections: [{ heading: 'Take', body: "Defaults to relational unless the problem is actually document-shaped, and a lot of teams reach for Mongo before that's true. Use the right tool." }],
  },
  'virtual:tech/redis': {
    kind: 'tech', title: 'Redis', status: 'active', stars: 4, category: 'Data',
    desc: 'Cache, pub/sub, rate limiting, ephemeral state.',
    sections: [{ heading: 'Where I use it', body: 'Caching expensive computes, rate-limit counters, simple pub/sub for event distribution. Not a primary store.' }],
  },
  'virtual:tech/r2': {
    kind: 'tech', title: 'Cloudflare R2', status: 'active', stars: 4, category: 'Data',
    desc: 'S3-compatible object storage with no egress fees.',
    sections: [{ heading: 'Where I use it', body: 'Blob storage for Flareo, file uploads, asset delivery. The no-egress pricing makes it easy to use without watching the meter.' }],
  },
  'virtual:tech/arduino': {
    kind: 'tech', title: 'Arduino', status: 'occasional', stars: 4, category: 'Embedded',
    desc: 'Hardware projects, sensor work, quick prototyping.',
    sections: [
      { heading: 'Boards', body: 'Uno R3 for hobby work, Nano 33 IoT for projects that need wireless.' },
      { heading: 'Projects', body: 'Autonomous rover with ultrasonic obstacle avoidance + Bluetooth control.', files: [{ path: 'projects/arduino-rover.md', icon: 'md' }] },
    ],
  },
  'virtual:tech/raspberry-pi': {
    kind: 'tech', title: 'Raspberry Pi', status: 'occasional', stars: 4, category: 'Embedded',
    desc: 'Small servers, robotics, anything where a full Linux box at $35 makes sense.',
    sections: [{ heading: 'Where I use it', body: 'Home automation tinkering, ROS-based robotics projects, occasional self-hosted services.' }],
  },
  'virtual:tech/ros': {
    kind: 'tech', title: 'ROS', status: 'occasional', stars: 3, category: 'Embedded',
    desc: 'Robotics middleware, pub/sub for hardware.',
    sections: [{ heading: 'Comfort', body: 'Built rover navigation stacks with ROS Noetic. Comfortable with topics, services, and basic SLAM concepts.' }],
  },
  'virtual:tech/blender': {
    kind: 'tech', title: 'Blender', status: 'occasional', stars: 3, category: 'Creative',
    desc: '3D modeling and animation for personal projects.',
    sections: [{ heading: 'What I make', body: 'Architectural visualization, low-poly assets, occasional procedural geometry experiments. Not a generalist, focused on specific styles I enjoy.' }],
  },
  'virtual:tech/figma': {
    kind: 'tech', title: 'Figma', status: 'active', stars: 4, category: 'Creative',
    desc: 'UI design and quick prototyping.',
    sections: [{ heading: 'Workflow', body: 'Sketch in Figma first when the design is non-trivial. Components + auto-layout. Frequently iterate by exporting to React directly.' }],
  },

  // ─── Achievements ───────────────────────────────────────────────────────
  'virtual:achievement/deans-list': {
    kind: 'achievement', title: "Dean's List", date: '2025', org: 'NYU Tandon', tier: 'gold',
    desc: 'Recognized for academic excellence, multiple semesters running.',
    sections: [
      { heading: 'What it took', body: 'Maintaining a high GPA while taking heavy courseloads (sometimes 18+ credits) and shipping side projects on the side.' },
      { heading: 'What I learned', body: 'How to manage time across competing priorities. When to grind vs when to rest. Sleep is undervalued.' },
    ],
  },
  'virtual:achievement/hacknyu-2024': {
    kind: 'achievement', title: '2nd place, Best Use of Hardware', date: '2024', org: 'HackNYU', tier: 'silver',
    desc: 'Built a real-time gesture-controlled drone interface in 36 hours.',
    sections: [
      { heading: 'What we built', body: 'A wearable that reads hand gestures via accelerometer + flex sensors, transmits over BLE to a base station, which sends MAVLink commands to a drone in real time.' },
      { heading: 'My role', body: 'Firmware on the wearable + the BLE bridge. Teammate handled the drone-control side.' },
      { heading: 'What I learned', body: "BLE is a pain in the ass under a deadline. Don't trust manufacturer SDKs. Real demos > slick slides." },
    ],
  },
  'virtual:achievement/tandon-scholarship': {
    kind: 'achievement', title: 'Tandon Scholarship Recipient', date: '2024', org: 'NYU Tandon', tier: 'gold',
    desc: 'Merit-based award for incoming freshmen.',
    sections: [
      { heading: 'About', body: 'Awarded based on academic record, leadership, and demonstrated interest in engineering. Renewable through undergraduate study.' },
    ],
  },
  'virtual:achievement/valedictorian': {
    kind: 'achievement', title: 'Valedictorian / National Honor Society', date: '2023', org: 'High School', tier: 'gold',
    desc: 'Top of graduating class.',
    sections: [
      { heading: 'About', body: 'Graduated as valedictorian. Active in National Honor Society, peer tutoring and community service hours.' },
    ],
  },
  'virtual:achievement/ap-scholar': {
    kind: 'achievement', title: 'AP Scholar with Distinction', date: '2023', org: 'College Board', tier: 'silver',
    desc: 'Average score of 3.5+ across 5+ AP exams.',
    sections: [
      { heading: 'Subjects', body: 'CS A (5), Calc BC (5), Physics C (5), Lang (4), US History (4).' },
    ],
  },
  'virtual:achievement/math-olympiad': {
    kind: 'achievement', title: 'Top 10%, Regional Math Olympiad', date: '2022', org: 'Regional Math Olympiad', tier: 'bronze',
    desc: 'Geometry & combinatorics tracks.',
    sections: [
      { heading: 'About', body: 'Top 10% finish in the regional round. Geometry and combinatorics were my stronger tracks.' },
    ],
  },

  // ─── Timeline milestones ────────────────────────────────────────────────
  'virtual:milestone/graduation-2027': {
    kind: 'milestone', title: 'Graduate from NYU Tandon', date: '2027 (planned)', type: 'edu', status: 'planned',
    sections: [
      { heading: 'About', body: 'B.S. Computer Science, expected May 2027.' },
      { heading: "What's next", body: "After graduation: ideally a full-time engineering role at a place where I can ship and learn fast. Open to startups, scale-ups, and the engineering teams at larger companies." },
    ],
  },
  'virtual:milestone/internship-2026': {
    kind: 'milestone', title: 'Summer 2026 internship', date: '2026 (planned)', type: 'work', status: 'planned',
    sections: [
      { heading: 'Looking for', body: 'Full-stack or systems-leaning roles. Backend infrastructure, distributed systems, or frontend with strong engineering culture.' },
      { heading: 'Logistics', body: 'NYC or remote-friendly preferred but open to relocation. Available May–Aug.' },
    ],
  },
  'virtual:milestone/portfolio-v2': {
    kind: 'milestone', title: 'Building portfolio v2 (this site)', date: 'Now', type: 'project', status: 'current',
    sections: [
      { heading: 'About', body: "A reimagined portfolio as a Cursor-IDE clone. Made every panel real, the file tree opens files, the search works across content, the AI chat answers questions about me, and there's a penguin." },
      { heading: 'Why', body: "Generic portfolio templates don't show how I think. This one does." },
    ],
  },
  'virtual:milestone/rust-2025': {
    kind: 'milestone', title: 'Started learning Rust', date: '2025', type: 'personal', status: 'done',
    sections: [
      { heading: 'About', body: "Working through the Rust book on weekends. Ownership is making sense slowly. Want to ship something real this year." },
    ],
  },
  'virtual:milestone/nyu-2023': {
    kind: 'milestone', title: 'Started at NYU Tandon', date: '2023', type: 'edu', status: 'done',
    sections: [
      { heading: 'About', body: 'Began undergrad at NYU Tandon studying Computer Science. Tandon Scholarship recipient.' },
    ],
  },
  'virtual:milestone/hs-2023': {
    kind: 'milestone', title: 'Graduated high school', date: '2023', type: 'edu', status: 'done',
    sections: [
      { heading: 'About', body: 'Valedictorian. National Honor Society. AP Scholar with Distinction. Spent the year before graduation also picking up programming as a serious interest.' },
    ],
  },
};

// Renders a virtual content tab, tech detail, achievement detail, or milestone detail
function VirtualPane({ path, onOpenFile }) {
  const content = VIRTUAL_CONTENT[path];
  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center"
           style={{ color: C.textMuted, fontSize: 12, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
        {'// content not available'}
      </div>
    );
  }

  const tierColor = { gold: C.warn, silver: '#c0c0c8', bronze: '#cd7f32' };
  const statusColor = { daily: C.ok, active: C.accent, occasional: C.synAttr, learning: C.warn };

  // Pick an accent color and a small label badge to render in the header
  let accentColor = C.accent;
  let badge = null;

  if (content.kind === 'tech') {
    accentColor = statusColor[content.status] || C.accent;
    badge = (
      <span style={{
        fontSize: 10,
        color: accentColor,
        background: C.bgInput,
        padding: '2px 8px',
        borderRadius: 4,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>{content.status}</span>
    );
  } else if (content.kind === 'achievement') {
    accentColor = tierColor[content.tier] || C.accent;
    badge = (
      <span style={{
        fontSize: 10,
        color: accentColor,
        background: C.bgInput,
        padding: '2px 8px',
        borderRadius: 4,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>{content.tier}</span>
    );
  } else if (content.kind === 'milestone') {
    const sm = { done: C.ok, current: C.accent, planned: C.warn };
    accentColor = sm[content.status] || C.accent;
    badge = (
      <span style={{
        fontSize: 10,
        color: accentColor,
        background: C.bgInput,
        padding: '2px 8px',
        borderRadius: 4,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>{content.status}</span>
    );
  }

  return (
    <div className="overflow-auto h-full">
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '40px 48px',
        fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
        color: C.textPrimary,
      }}>
        {/* Subtle context tag above the title */}
        {content.kind === 'tech' && (
          <div style={{ fontSize: 11, color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace', letterSpacing: '0.05em', marginBottom: 6 }}>
            stack / {content.category?.toLowerCase()}
          </div>
        )}
        {content.kind === 'achievement' && (
          <div style={{ fontSize: 11, color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace', letterSpacing: '0.05em', marginBottom: 6 }}>
            achievement · {content.org}
          </div>
        )}
        {content.kind === 'milestone' && (
          <div style={{ fontSize: 11, color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace', letterSpacing: '0.05em', marginBottom: 6 }}>
            timeline · {content.type}
          </div>
        )}

        {/* Title */}
        <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 0,
            color: C.textActive,
          }}>{content.title}</h1>
          {badge}
        </div>

        {/* Date / org line */}
        <div style={{
          fontSize: 13,
          color: C.textSecondary,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          marginBottom: 24,
        }}>
          {content.date && <span>{content.date}</span>}
          {content.kind === 'tech' && content.stars && (
            <span className="flex items-center" style={{ marginLeft: 12, gap: 1 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} strokeWidth={1.5}
                      fill={i < content.stars ? C.warn : 'none'}
                      style={{ color: i < content.stars ? C.warn : C.textMuted }} />
              ))}
            </span>
          )}
        </div>

        {/* Top-level desc as a callout */}
        {content.desc && (
          <div style={{
            background: C.bgInput,
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${accentColor}`,
            padding: '12px 16px',
            borderRadius: 4,
            color: C.textPrimary,
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 28,
          }}>
            {content.desc}
          </div>
        )}

        {/* Sections, each has a heading + body, optional file links */}
        {content.sections?.map((s, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 13,
              fontWeight: 600,
              color: C.textActive,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 8,
            }}>{s.heading}</h2>
            <div style={{
              fontSize: 14,
              color: C.textPrimary,
              lineHeight: 1.7,
            }}>{s.body}</div>

            {s.files && s.files.length > 0 && (
              <div className="flex flex-wrap gap-2" style={{ marginTop: 10 }}>
                {s.files.map((f, j) => (
                  <div key={j}
                       onClick={() => onOpenFile && onOpenFile({
                         name: f.path.split('/').pop(),
                         path: f.path,
                         icon: f.icon,
                       })}
                       className="cursor-pointer flex items-center gap-2"
                       style={{
                         background: C.bgChip,
                         border: `1px solid ${C.border}`,
                         padding: '6px 10px',
                         borderRadius: 4,
                         fontSize: 12,
                         fontFamily: 'Geist Mono, ui-monospace, monospace',
                       }}
                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; }}
                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}>
                    <FileIcon kind={f.icon} />
                    <span style={{ color: C.textPrimary }}>{f.path}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Terminal prompt prefix ───────────────────────────────────────────────
function PromptPrefix() {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      <span style={{ color: C.synKeyword }}>visitor</span>
      <span style={{ color: C.textSecondary }}>@</span>
      <span style={{ color: C.synType }}>mohanlu</span>
      <span style={{ color: C.textSecondary }}>:</span>
      <span style={{ color: C.accent }}>~</span>
      <span style={{ color: C.textSecondary }}> %</span>
    </span>
  );
}

// ── Typewriter wordmark ──────────────────────────────────────────────────
// Cycles through identity suffixes after "MohanLu.", types out, holds,
// deletes, repeats with the next entry. The suffixes list is module-level
// so it has a stable identity across renders (otherwise the typewriter
// useEffect's exhaustive-deps would flag it).
const TYPEWRITER_SUFFIXES = ['', 'dev', 'engineer', 'student', 'builder', 'designer'];

function TypewriterWordmark() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'hold' | 'deleting'

  useEffect(() => {
    let timeout;
    const target = TYPEWRITER_SUFFIXES[idx];

    if (phase === 'typing') {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 1600);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('deleting'), 1400);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
      } else {
        const next = (idx + 1) % TYPEWRITER_SUFFIXES.length;
        setIdx(next);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, idx]);

  return (
    <div className="flex items-baseline" style={{
      fontSize: 14,
      fontWeight: 400,
      fontFamily: 'Geist Mono, ui-monospace, monospace',
      color: C.textActive,
      letterSpacing: '-0.01em',
    }}>
      <span style={{ color: C.textPrimary }}>./</span>
      <span style={{ color: C.textPrimary }}>mohanlu_</span>
      <span style={{ color: C.accent }}>{text}</span>
      <span style={{
        display: 'inline-block',
        width: 2, height: 13,
        background: C.accent,
        marginLeft: 2,
        animation: 'blink 1.1s infinite',
      }} />
    </div>
  );
}


// ── GitHub activity heatmap ──────────────────────────────────────────────
// Renders a compact 7-row × 12-column contribution grid in the file-tree
// footer, styled to closely match GitHub's dark-mode contribution graph.
// Data is generated with a "streak" model so it forms believable patterns
// of bursts and quiet stretches rather than uniform noise.
function GithubActivityHeatmap() {
  const COLS = 12;
  const ROWS = 7; // Sun-Sat

  // Deterministic per-day hash → 0..1, with enough entropy that consecutive
  // dates hash to clearly different values. Uses FNV-1a + a 32-bit mixer.
  // The naive "h = (h << 5) - h + char" approach fails here because date
  // strings only differ by 1-2 characters, and 32-bit truncation collapses
  // their differences into identical hashes, every day in a month hashing
  // to the same value. This version fixes that.
  const hashStr = (s) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    h ^= h >>> 13;
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 16;
    return ((h >>> 0) % 100000) / 100000;
  };

  // Build grid: walk forward day-by-day from oldest to newest, carrying a
  // "streak energy" counter that decays over time. When energy is high, days
  // are more likely to commit (mimicking project work bursts). When low,
  // days go quiet. This produces realistic clustered activity.
  const today = new Date('2026-04-25'); // freeze "today" for consistent demo data
  // Find the most recent Saturday (end of grid)
  const lastSat = new Date(today);
  lastSat.setDate(today.getDate() + (6 - today.getDay()));
  const startDate = new Date(lastSat);
  startDate.setDate(lastSat.getDate() - (COLS * 7 - 1));

  // First pass: walk every day in chronological order. Use a simple model
  // that produces a "working dev" profile, most weekdays have some commits,
  // weekends are sparser, occasional bright spots scattered throughout. We
  // deliberately don't try to model project bursts because the panel is small
  // and the reader just needs to see "this person ships consistently."
  const dayData = []; // [{date, dateStr, intensity, isFuture, dayOfWeek}, ...]
  for (let i = 0; i < COLS * 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const dow = d.getDay(); // 0=Sun, 6=Sat
    const isFuture = d > today;
    const isWeekend = dow === 0 || dow === 6;

    // Three independent hashes per day so behavior decouples nicely
    const r = hashStr(dateStr);

    let intensity;
    if (isFuture) {
      intensity = -1;
    } else if (isWeekend) {
      // Weekends: ~70% empty (most weekends quiet)
      intensity = r < 0.70 ? 0
                : r < 0.88 ? 1
                : r < 0.97 ? 2
                : r < 0.995 ? 3
                : 4;
    } else {
      // Weekdays: roughly 35% empty, 30% low, 20% mid, 12% mid-bright, 3% bright.
      // This produces a heatmap that's clearly populated but with believable gaps.
      intensity = r < 0.35 ? 0
                : r < 0.65 ? 1
                : r < 0.85 ? 2
                : r < 0.97 ? 3
                : 4;
    }
    dayData.push({ date: d, dateStr, intensity, isFuture, dow });
  }

  // Reorganize into [col][row] grid for rendering, col=week, row=day-of-week
  // GitHub-style: column 0 is oldest, column COLS-1 is newest. Within each
  // column, row 0 is Sunday, row 6 is Saturday.
  const grid = [];
  for (let col = 0; col < COLS; col++) {
    const colDays = [];
    for (let row = 0; row < ROWS; row++) {
      const idx = col * 7 + row;
      colDays.push(dayData[idx]);
    }
    grid.push(colDays);
  }

  // Total commits, sum intensities × small multiplier for realism
  const totalCommits = dayData.reduce((s, c) => s + (c.intensity > 0 ? c.intensity * 2 + 1 : 0), 0);

  // GitHub's actual dark-mode contribution palette, with the empty cell
  // bumped slightly lighter than GitHub's `#161b22` so it pops against our
  // `#141414` panel background, otherwise level-0 cells look like holes.
  const intensityColor = [
    '#222222',  // 0, empty (visible against panel bg)
    '#0e4429',  // 1, faintest green
    '#006d32',  // 2
    '#26a641',  // 3
    '#39d353',  // 4, brightest green
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div style={{ padding: '8px 10px 10px' }}>
      {/* Header */}
      <div className="flex items-center" style={{ marginBottom: 6 }}>
        <Github size={11} strokeWidth={1.7} style={{ color: C.textSecondary, marginRight: 5 }} />
        <span style={{
          fontSize: 10,
          color: C.textSecondary,
          letterSpacing: '0.06em',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>Activity</span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 10,
          color: C.textMuted,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
        }}>
          {totalCommits} commits
        </span>
      </div>

      {/* Grid, 12 columns of 7 days each. Tight gap, no borders, GitHub-style. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: 3,
      }}>
        {grid.map((colDays, col) => (
          <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {colDays.map((cell, row) => {
              const idx = col * 7 + row;
              const isHovered = hoveredIdx === idx;
              // Future days don't render at all, match real GitHub
              if (cell.isFuture) {
                return <div key={row} style={{ aspectRatio: '1 / 1', width: '100%' }} />;
              }
              return (
                <div key={row}
                     onMouseEnter={() => setHoveredIdx(idx)}
                     onMouseLeave={() => setHoveredIdx((c) => c === idx ? null : c)}
                     style={{
                       aspectRatio: '1 / 1',
                       width: '100%',
                       background: intensityColor[cell.intensity],
                       borderRadius: 2,
                       cursor: 'pointer',
                       outline: isHovered ? `1px solid ${C.textPrimary}` : 'none',
                       outlineOffset: 1,
                       transition: 'outline-color 80ms',
                     }} />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip / legend, shows hovered cell info, or legend when nothing hovered */}
      <div style={{
        marginTop: 8,
        height: 14,
        fontSize: 10,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        lineHeight: '14px',
      }}>
        {hoveredIdx !== null && !dayData[hoveredIdx].isFuture ? (
          <span>
            <span style={{ color: C.ok }}>
              {dayData[hoveredIdx].intensity > 0 ? dayData[hoveredIdx].intensity * 2 + 1 : 'no'}
            </span>
            <span style={{ color: C.textSecondary }}>
              {' '}
              {dayData[hoveredIdx].intensity > 0 ? 'commits' : 'commits'} · {formatDate(dayData[hoveredIdx].date)}
            </span>
          </span>
        ) : (
          <div className="flex items-center" style={{ color: C.textMuted, gap: 4 }}>
            <span style={{ marginRight: 4 }}>Less</span>
            {intensityColor.map((c, i) => (
              <div key={i} style={{
                width: 9, height: 9, borderRadius: 2,
                background: c,
              }} />
            ))}
            <span style={{ marginLeft: 4 }}>More</span>
          </div>
        )}
      </div>
    </div>
  );
}


// ── Wandering pet ────────────────────────────────────────────────────────
// A small Tux penguin that lives along the top edge of the OUTLINE section.
// Has a state machine: walks, runs, slides on belly, hops, sleeps, yawns,
// stretches, scratches, looks around, follows cursor when near, occasionally
// catches a fish or trips. Click him for different reactions based on mood.
// Inspired by xpenguins / MobaXterm's idle penguin parade and vscode-pets.
function WanderingPet({ panelWidth }) {
  const [x, setX] = useState(20);
  const [dir, setDir] = useState(1);
  const [state, setState] = useState('walk');
  const [stepFrame, setStepFrame] = useState(0);
  const [hopOffset, setHopOffset] = useState(0);
  const [headTilt, setHeadTilt] = useState(0);    // -1 left, 0 center, 1 right
  const [headPitch, setHeadPitch] = useState(0);  // 0 normal, 1 looking up
  const [eyesClosed, setEyesClosed] = useState(false);
  const [emote, setEmote] = useState(null);
  const [danceFrame, setDanceFrame] = useState(0);  // 0 = lean left, 1 = lean right
  const [spinAngle, setSpinAngle] = useState(0);    // 0..360
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Drag tracking
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0); // additional vertical offset while dragged (negative = up)
  const dragRef = useRef({ startX: 0, startY: 0, originX: 0, originY: 0, lastX: 0, lastY: 0, lastTime: 0, vx: 0, vy: 0, moved: false });

  /*
   * STATES
   * ──────
   * walk / run / slide / hop , moving states (have horizontal speed)
   * stop     , paused, standing still
   * lookAround / lookUp, head animations
   * yawn / stretch / scratch / sit, idle stationary poses
   * sleep    , lying down, ZZZ
   * dance    , bobs left↔right rhythmically
   * spin     , full 360° rotation
   * sneeze   , body jerks, achoo emote
   * peek     , duck below + pop up
   * wave     , left wing waving + heart
   * dizzy / trip / fish, special reactions
   */

  // ── Movement loop ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isDragging) return; // No autonomous motion while dragged
    const speeds = { walk: 0.7, run: 2.0, slide: 1.6, hop: 0.9 };
    const speed = speeds[state];
    if (speed === undefined) return;
    const tick = setInterval(() => {
      setX((prev) => {
        const maxX = Math.max(48, panelWidth - 44);
        let next = prev + dir * speed;
        if (next >= maxX) { setDir(-1); next = maxX; }
        else if (next <= 4) { setDir(1); next = 4; }
        return next;
      });
    }, 30);
    return () => clearInterval(tick);
  }, [state, dir, panelWidth, isDragging]);

  // ── Foot wiggle ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!['walk', 'run', 'hop'].includes(state)) return;
    const pace = state === 'run' ? 100 : state === 'hop' ? 180 : 220;
    const t = setInterval(() => setStepFrame((f) => (f + 1) % 2), pace);
    return () => clearInterval(t);
  }, [state]);

  // ── Hop bob ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'hop') { setHopOffset(0); return; }
    const t = setInterval(() => setHopOffset((o) => (o === 0 ? -4 : 0)), 180);
    return () => clearInterval(t);
  }, [state]);

  // ── Dance lean ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'dance') { setDanceFrame(0); return; }
    const t = setInterval(() => setDanceFrame((f) => (f + 1) % 2), 280);
    return () => clearInterval(t);
  }, [state]);

  // ── Spin rotation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'spin') { setSpinAngle(0); return; }
    const t = setInterval(() => setSpinAngle((a) => (a + 24) % 360), 30);
    return () => clearInterval(t);
  }, [state]);

  // ── Random idle picker ──────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'walk') return;
    const wait = 3500 + Math.random() * 4500;
    const t = setTimeout(() => {
      const choices = [
        { name: 'lookAround', weight: 3, duration: 2200 },
        { name: 'lookUp',     weight: 2, duration: 1800,  emoteOnEnter: () => Math.random() > 0.5 ? 'sparkle' : null },
        { name: 'yawn',       weight: 2, duration: 1400 },
        { name: 'stretch',    weight: 2, duration: 1300 },
        { name: 'scratch',    weight: 2, duration: 1200 },
        { name: 'stop',       weight: 2, duration: 1500 },
        { name: 'hop',        weight: 2, duration: 2200 },
        { name: 'run',        weight: 2, duration: 1800 },
        { name: 'slide',      weight: 1, duration: 1500 },
        { name: 'sleep',      weight: 1, duration: 5000,  emoteOnEnter: () => 'zzz' },
        { name: 'dance',      weight: 2, duration: 2800,  emoteOnEnter: () => 'note' },
        { name: 'spin',       weight: 1, duration: 1200 },
        { name: 'sneeze',     weight: 1, duration: 900,   emoteOnEnter: () => 'achoo' },
        { name: 'peek',       weight: 1, duration: 1500 },
        { name: 'fish',       weight: 1, duration: 1800,  emoteOnEnter: () => 'fish' },
        { name: 'trip',       weight: 1, duration: 1100,  emoteOnEnter: () => 'exclaim' },
      ];
      const total = choices.reduce((s, c) => s + c.weight, 0);
      let r = Math.random() * total;
      let pick = choices[0];
      for (const c of choices) { r -= c.weight; if (r <= 0) { pick = c; break; } }

      setState(pick.name);
      if (pick.emoteOnEnter) setEmote(pick.emoteOnEnter());

      setTimeout(() => {
        setState('walk');
        setEmote(null);
      }, pick.duration);
    }, wait);
    return () => clearTimeout(t);
  }, [state]);

  // ── Look-around head animation ──────────────────────────────────────────
  useEffect(() => {
    if (state !== 'lookAround') return;
    setHeadTilt(-1);
    const t1 = setTimeout(() => setHeadTilt(1), 700);
    const t2 = setTimeout(() => setHeadTilt(0), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); setHeadTilt(0); };
  }, [state]);

  // ── Head looks up ───────────────────────────────────────────────────────
  useEffect(() => {
    if (state === 'lookUp') setHeadPitch(1);
    else setHeadPitch(0);
  }, [state]);

  // ── Eyes closed for yawn/sleep/sneeze/dance ─────────────────────────────
  useEffect(() => {
    if (['yawn', 'sleep', 'sneeze'].includes(state)) setEyesClosed(true);
    else if (state === 'dance' && danceFrame === 1) setEyesClosed(true);
    else setEyesClosed(false);
  }, [state, danceFrame]);

  // ── Periodic CS phrase emotes, random one-liners while walking ────────
  // Tux occasionally exclaims a classic CS phrase like "Hello, World!" or "404".
  useEffect(() => {
    if (state !== 'walk') return;
    const phrases = [
      'Hello, World!',
      '404',
      'sudo',
      'segfault',
      'git push --force',
      ':wq',
      'rm -rf /',
      'npm install',
      'undefined',
      'NullPointerException',
      'TODO',
      'It works on my machine',
      'cmd+z',
      'stack overflow',
      'kernel panic',
      '0xDEADBEEF',
      'works locally',
      'fork()',
      'hello.c',
      'Ctrl+C Ctrl+V',
      '42',
      'reboot',
    ];
    const wait = 8000 + Math.random() * 8000;
    const t = setTimeout(() => {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setEmote('phrase:' + phrase);
      setTimeout(() => setEmote((cur) => cur === 'phrase:' + phrase ? null : cur), 2600);
    }, wait);
    return () => clearTimeout(t);
  }, [state]);

  // ── Random blink ────────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'walk') return;
    const t = setInterval(() => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 130);
    }, 3500 + Math.random() * 2500);
    return () => clearInterval(t);
  }, [state]);

  // ── Cursor proximity tracking ───────────────────────────────────────────
  useEffect(() => {
    if (state !== 'walk' && state !== 'stop') return;
    const onMove = (e) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dist = Math.hypot(dx, e.clientY - (r.top + r.height / 2));
      if (dist < 100) {
        setHeadTilt(dx < -10 ? -1 : dx > 10 ? 1 : 0);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [state]);

  // ── Click handler ───────────────────────────────────────────────────────
  const handleClick = () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    const newCount = clickCount + 1;
    setClickCount(newCount);
    clickTimerRef.current = setTimeout(() => setClickCount(0), 800);

    if (newCount >= 3) {
      setState('dizzy');
      setEmote('dizzy');
      setTimeout(() => { setState('walk'); setEmote(null); }, 2000);
      return;
    }
    if (state === 'sleep') {
      setState('stop');
      setEmote('exclaim');
      setTimeout(() => { setState('walk'); setEmote(null); }, 1100);
      return;
    }
    if (state === 'dance') {
      // Already dancing, extend with extra notes
      setEmote('note');
      setTimeout(() => setEmote(null), 1500);
      return;
    }
    setState('wave');
    setEmote('heart');
    setTimeout(() => { setState('walk'); setEmote(null); }, 1600);
  };

  // ── Drag handlers ───────────────────────────────────────────────────────
  // mousedown starts a potential drag. If the cursor moves >3px before
  // mouseup, it becomes a drag. Otherwise it's treated as a click.
  // Drag is 2-axis: horizontal moves him along the divider, vertical lifts
  // him up into the file tree area (capped). On release, gravity pulls him
  // back down to the divider.
  const handleMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: x,
      originY: dragY,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now(),
      vx: 0,
      vy: 0,
      moved: false,
    };

    const onMove = (ev) => {
      const dxTotal = ev.clientX - dragRef.current.startX;
      const dyTotal = ev.clientY - dragRef.current.startY;
      // Threshold of 3px before we commit to "this is a drag"
      if (!dragRef.current.moved && Math.hypot(dxTotal, dyTotal) > 3) {
        dragRef.current.moved = true;
        setIsDragging(true);
        setState('dragged');
        setEmote('exclaim'); // surprised "!" while being lifted
      }
      if (dragRef.current.moved) {
        // Track per-axis velocity for fling detection on release
        const now = Date.now();
        const dt = now - dragRef.current.lastTime || 1;
        const dx = ev.clientX - dragRef.current.lastX;
        const dy = ev.clientY - dragRef.current.lastY;
        dragRef.current.vx = dx / dt;
        dragRef.current.vy = dy / dt;
        dragRef.current.lastX = ev.clientX;
        dragRef.current.lastY = ev.clientY;
        dragRef.current.lastTime = now;

        // Horizontal, clamp inside file panel
        const maxX = Math.max(48, panelWidth - 44);
        const nextX = Math.max(4, Math.min(maxX, dragRef.current.originX + dxTotal));
        if (dx > 0.5) setDir(1);
        else if (dx < -0.5) setDir(-1);
        setX(nextX);

        // Vertical, only allow lifting UP (negative dragY). Cap at -200
        // so she can be lifted up into the file tree area.
        const nextY = Math.max(-200, Math.min(0, dragRef.current.originY + dyTotal));
        setDragY(nextY);
      }
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      if (!dragRef.current.moved) {
        // Just a click, fall through to click handler
        handleClick();
        return;
      }

      // Was a drag, process drop reaction based on combined velocity + height
      const v = Math.hypot(dragRef.current.vx, dragRef.current.vy);
      const heightDropped = Math.abs(dragY); // how high she was when released
      setIsDragging(false);

      // Animate fall back to the divider line
      animateFallToDivider();

      // Drop reaction depends on speed + height
      // Bigger fall or faster fling = more dramatic landing
      const intensity = v + heightDropped / 50;

      if (intensity > 3) {
        // Yeeted hard or dropped from way up, wheee then dizzy
        setState('dizzy');
        setEmote('phrase:wheee!');
        setTimeout(() => setEmote('dizzy'), 800);
        setTimeout(() => { setState('walk'); setEmote(null); }, 2400);
      } else if (intensity > 1.2) {
        // Decent drop, landed stunned
        setState('trip');
        setEmote('exclaim');
        setTimeout(() => { setState('walk'); setEmote(null); }, 1200);
      } else {
        // Gentle drop, landed safely with a relieved sparkle
        setState('stop');
        setEmote('sparkle');
        setTimeout(() => { setState('walk'); setEmote(null); }, 1100);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Animate fall from current dragY back to 0 (the divider line).
  // Uses a simple gravity-style ease, accelerating down.
  const animateFallToDivider = () => {
    let velocity = 0;
    const gravity = 1.2; // px per frame²
    const fall = setInterval(() => {
      setDragY((prev) => {
        if (prev >= 0) {
          clearInterval(fall);
          return 0;
        }
        velocity += gravity;
        const next = prev + velocity;
        if (next >= 0) {
          clearInterval(fall);
          return 0;
        }
        return next;
      });
    }, 16);
  };

  // ── Render flags ────────────────────────────────────────────────────────
  const leftFootLift  = ['walk', 'run', 'hop'].includes(state) && stepFrame === 0 ? 2 : 0;
  const rightFootLift = ['walk', 'run', 'hop'].includes(state) && stepFrame === 1 ? 2 : 0;
  const isSliding   = state === 'slide';
  const isSleeping  = state === 'sleep';
  const isWaving    = state === 'wave';
  const isStretching = state === 'stretch';
  const isScratching = state === 'scratch';
  const isYawning   = state === 'yawn';
  const isTripping  = state === 'trip';
  const isDizzy     = state === 'dizzy';
  const isDancing   = state === 'dance';
  const isSpinning  = state === 'spin';
  const isSneezing  = state === 'sneeze';
  const isPeeking   = state === 'peek';
  const isDragged   = state === 'dragged';

  // Composed transform, flip + trip + dizzy + dance lean + spin + peek + dragged
  const movementStates = ['walk', 'run', 'slide', 'hop'];
  const flip = movementStates.includes(state) && dir === -1;
  const transformParts = [];
  if (flip) transformParts.push('scaleX(-1)');
  if (isTripping) transformParts.push('rotate(18deg)');
  if (isDizzy) transformParts.push(`rotate(${stepFrame ? -10 : 10}deg)`);
  if (isDancing) transformParts.push(`rotate(${danceFrame ? 8 : -8}deg)`);
  if (isSpinning) transformParts.push(`rotate(${spinAngle}deg)`);
  if (isSneezing) transformParts.push('translateX(-3px)');
  if (isDragged) transformParts.push('scale(1.1)'); // slightly bigger when held
  const composedTransform = transformParts.join(' ') || 'none';

  // Vertical offset, peek dips below the divider
  const peekOffset = isPeeking ? 14 : 0;

  // ── Sleeping render, 56x28 sideways pose ──────────────────────────────
  if (isSleeping) {
    return (
      <div ref={containerRef} onMouseDown={handleMouseDown} title="zzz... click or drag"
           style={{ position: 'absolute', left: x, top: -28 + dragY, width: 56, height: 28, cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', zIndex: 5 }}>
        <svg width="56" height="28" viewBox="0 0 56 28" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="28" cy="18" rx="20" ry="8" fill="#1a1a1a" />
          <ellipse cx="28" cy="20" rx="14" ry="5" fill="#f5f5f5" />
          <ellipse cx="11" cy="14" rx="7" ry="6" fill="#1a1a1a" />
          <ellipse cx="11" cy="16" rx="5" ry="4" fill="#f5f5f5" />
          <line x1="8" y1="14" x2="11" y2="14" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
          <polygon points="2,14.5 8,13.5 8,16.5" fill="#ff9a1f" />
          <line x1="3.5" y1="15" x2="7.5" y2="15" stroke="#cc7a00" strokeWidth="0.4" />
          <ellipse cx="44" cy="22" rx="3.5" ry="1.5" fill="#ff9a1f" />
          <ellipse cx="48" cy="20" rx="3.5" ry="1.3" fill="#ff9a1f" />
        </svg>
        <PetEmote emote={emote} />
      </div>
    );
  }

  // ── Side-profile render for horizontal movement (walk/run/slide/hop) ──
  // Penguin drawn from the side: one eye visible, beak protrudes forward,
  // one wing visible, two legs staggered for side gait.
  const movingHorizontal = ['walk', 'run', 'hop'].includes(state);
  const sliding = state === 'slide';

  if (movingHorizontal || sliding) {
    // Foot stagger, front foot raises, back foot plants
    const frontFootLift = stepFrame === 0 ? 2 : 0;
    const backFootLift  = stepFrame === 1 ? 2 : 0;
    // Beak shifts slightly when running (open beak from exertion)
    const isRunning = state === 'run';

    return (
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        title="click or drag"
        style={{
          position: 'absolute',
          left: x,
          top: -36 + hopOffset + dragY,
          width: 36,
          height: 36,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          // Flip horizontally when walking left so beak points correct direction
          transform: dir === -1 ? 'scaleX(-1)' : 'none',
          transition: isDragging ? 'transform 120ms' : 'left 60ms linear, top 100ms ease-out, transform 120ms',
          zIndex: 5,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          {/* Body, egg shape */}
          <ellipse cx="16" cy="20" rx="9" ry="11" fill="#1a1a1a" />
          {/* Head, round, slightly forward (right) */}
          <ellipse cx="17" cy="10" rx="7" ry="6.5" fill="#1a1a1a" />
          {/* White face crescent, only on the front-facing side */}
          <ellipse cx="20" cy="11" rx="4" ry="4" fill="#f5f5f5" />
          {/* The one visible eye */}
          {eyesClosed ? (
            <line x1="19.5" y1="10" x2="21.5" y2="10" stroke="#1a1a1a" strokeWidth="1.1" strokeLinecap="round" />
          ) : (
            <circle cx="20.5" cy="10" r="1.1" fill="#1a1a1a" />
          )}
          {/* Beak, clearly protruding from the front of the head */}
          {isRunning ? (
            <>
              {/* Open beak when running, top + bottom triangles */}
              <polygon points="24,9 28,9.5 24,11" fill="#ff9a1f" />
              <polygon points="24,11.5 28,12 24,13" fill="#ff9a1f" />
            </>
          ) : (
            <>
              <polygon points="24,9 28.5,11 24,13" fill="#ff9a1f" />
              <line x1="24" y1="11" x2="27.5" y2="11" stroke="#cc7a00" strokeWidth="0.6" />
            </>
          )}
          {/* White belly, visible from the side */}
          <ellipse cx="18" cy="22" rx="5.5" ry="8.5" fill="#f5f5f5" />
          {/* The one visible wing, varies by movement state */}
          {sliding ? (
            <ellipse cx="10" cy="22" rx="4" ry="1.8" fill="#1a1a1a" transform="rotate(-15 10 22)" />
          ) : (
            <ellipse cx="11" cy="20" rx="2.3" ry="5.5" fill="#1a1a1a" transform={`rotate(${stepFrame ? -8 : 8} 11 20)`} />
          )}
          {/* Legs, staggered front/back for side gait */}
          {sliding ? (
            <>
              {/* Feet trailing behind during belly slide */}
              <ellipse cx="10" cy="31" rx="3" ry="1.2" fill="#ff9a1f" />
              <ellipse cx="14" cy="32" rx="3" ry="1.2" fill="#ff9a1f" />
            </>
          ) : (
            <>
              <ellipse cx="14" cy={32 - backFootLift}  rx="3" ry="1.3" fill="#ff9a1f" />
              <ellipse cx="20" cy={32 - frontFootLift} rx="3" ry="1.3" fill="#ff9a1f" />
            </>
          )}
          {/* Dust puff when running */}
          {isRunning && (
            <>
              <circle cx={5 + stepFrame * 2} cy="33" r="1.6" fill={C.textMuted} opacity="0.5" />
              <circle cx={8 + stepFrame * 2} cy="32" r="1.1" fill={C.textMuted} opacity="0.3" />
            </>
          )}
        </svg>
        <PetEmote emote={emote} />
      </div>
    );
  }

  // ── Standard standing render, 36x36 (front view) ───────────────────────
  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      title="click or drag"
      style={{
        position: 'absolute',
        left: x,
        top: -36 + hopOffset + peekOffset + dragY,
        width: 36,
        height: 36,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        transform: composedTransform,
        transition: isDragging ? 'transform 120ms' : 'left 60ms linear, top 100ms ease-out, transform 120ms',
        zIndex: 5,
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="18" cy="20" rx="10.5" ry="12" fill="#1a1a1a" />
        {/* Head, tilts left/right + pitches up */}
        <g transform={`translate(${headTilt * 1.8}, ${-headPitch * 1.5})`}>
          <ellipse cx="18" cy="11" rx="8" ry="7.5" fill="#1a1a1a" />
          <ellipse cx="18" cy="12.5" rx="5.5" ry="4.5" fill="#f5f5f5" />
          {eyesClosed ? (
            <>
              <line x1="14.4" y1="11" x2="16.6" y2="11" stroke="#1a1a1a" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="19.4" y1="11" x2="21.6" y2="11" stroke="#1a1a1a" strokeWidth="1.1" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx={15.3 + headTilt * 0.5} cy={11 - headPitch * 0.5} r="1.2" fill="#1a1a1a" />
              <circle cx={20.7 + headTilt * 0.5} cy={11 - headPitch * 0.5} r="1.2" fill="#1a1a1a" />
            </>
          )}
          {/* (eyes only, beak rendered after belly so it's on top) */}
        </g>

        {/* White belly */}
        <ellipse cx="18" cy="22" rx="6.8" ry="9" fill="#f5f5f5" />

        {/* Beak, rendered AFTER belly so it's never hidden. Includes head tilt. */}
        <g transform={`translate(${headTilt * 1.8}, ${-headPitch * 1.5})`}>
          {isYawning ? (
            <>
              <polygon points="15.5,15 20.5,15 18,19" fill="#ff9a1f" />
              <line x1="16" y1="16.2" x2="20" y2="16.2" stroke="#cc7a00" strokeWidth="0.6" />
            </>
          ) : isSneezing ? (
            <>
              <polygon points="14.5,14.5 21.5,14.5 18,19" fill="#ff9a1f" />
              <line x1="15" y1="15.7" x2="21" y2="15.7" stroke="#cc7a00" strokeWidth="0.6" />
            </>
          ) : headPitch ? (
            <>
              <polygon points="15.5,15 20.5,15 18,11" fill="#ff9a1f" />
              <line x1="16" y1="14" x2="20" y2="14" stroke="#cc7a00" strokeWidth="0.6" />
            </>
          ) : (
            <>
              <polygon points="15.5,15 20.5,15 18,18.5" fill="#ff9a1f" />
              <line x1="16" y1="16" x2="20" y2="16" stroke="#cc7a00" strokeWidth="0.6" />
            </>
          )}
        </g>

        {/* Left wing */}
        {isWaving ? (
          <ellipse cx="7" cy="13" rx="2.3" ry="4.5" fill="#1a1a1a" transform="rotate(-30 7 13)">
            <animateTransform attributeName="transform" type="rotate"
              values="-30 7 13; -55 7 13; -30 7 13" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
        ) : isDragged ? (
          // Both wings flap rapidly while being lifted, panicked feel
          <ellipse cx="6" cy="14" rx="2.3" ry="5" fill="#1a1a1a">
            <animateTransform attributeName="transform" type="rotate"
              values="-20 6 14; -50 6 14; -20 6 14" dur="0.25s" repeatCount="indefinite" />
          </ellipse>
        ) : isStretching ? (
          <ellipse cx="5" cy="17" rx="2.3" ry="5.5" fill="#1a1a1a" transform="rotate(-25 5 17)" />
        ) : isScratching ? (
          <ellipse cx="11" cy="14" rx="2.3" ry="4.5" fill="#1a1a1a" transform="rotate(-15 11 14)" />
        ) : isSliding ? (
          <ellipse cx="6" cy="22" rx="3.5" ry="1.8" fill="#1a1a1a" transform="rotate(-10 6 22)" />
        ) : isDancing ? (
          <ellipse cx="6" cy="16" rx="2.3" ry="5" fill="#1a1a1a" transform={`rotate(${danceFrame ? -45 : -10} 6 16)`} />
        ) : isSneezing ? (
          <ellipse cx="9" cy="17" rx="2.3" ry="5.2" fill="#1a1a1a" transform="rotate(-20 9 17)" />
        ) : (
          <ellipse cx="9" cy="20" rx="2.3" ry="5.5" fill="#1a1a1a" />
        )}

        {/* Right wing */}
        {isDragged ? (
          <ellipse cx="30" cy="14" rx="2.3" ry="5" fill="#1a1a1a">
            <animateTransform attributeName="transform" type="rotate"
              values="20 30 14; 50 30 14; 20 30 14" dur="0.25s" repeatCount="indefinite" />
          </ellipse>
        ) : isStretching ? (
          <ellipse cx="31" cy="17" rx="2.3" ry="5.5" fill="#1a1a1a" transform="rotate(25 31 17)" />
        ) : isSliding ? (
          <ellipse cx="30" cy="22" rx="3.5" ry="1.8" fill="#1a1a1a" transform="rotate(10 30 22)" />
        ) : isDancing ? (
          <ellipse cx="30" cy="16" rx="2.3" ry="5" fill="#1a1a1a" transform={`rotate(${danceFrame ? 10 : 45} 30 16)`} />
        ) : isSneezing ? (
          <ellipse cx="27" cy="17" rx="2.3" ry="5.2" fill="#1a1a1a" transform="rotate(20 27 17)" />
        ) : (
          <ellipse cx="27" cy="20" rx="2.3" ry="5.5" fill="#1a1a1a" />
        )}

        {/* Feet */}
        {isSliding ? (
          <>
            <ellipse cx="9" cy="31" rx="3.8" ry="1.2" fill="#ff9a1f" />
            <ellipse cx="14" cy="32" rx="3" ry="1.2" fill="#ff9a1f" />
          </>
        ) : isScratching ? (
          <>
            <ellipse cx="14" cy="16" rx="2.8" ry="1.4" fill="#ff9a1f" transform="rotate(-30 14 16)" />
            <ellipse cx="22" cy="32" rx="3" ry="1.4" fill="#ff9a1f" />
          </>
        ) : isDancing ? (
          <>
            <ellipse cx={14 - danceFrame * 1.5} cy="32" rx="3" ry="1.4" fill="#ff9a1f" />
            <ellipse cx={22 + danceFrame * 1.5} cy="32" rx="3" ry="1.4" fill="#ff9a1f" />
          </>
        ) : (
          <>
            <ellipse cx="14" cy={32 - leftFootLift}  rx="3" ry="1.4" fill="#ff9a1f" />
            <ellipse cx="22" cy={32 - rightFootLift} rx="3" ry="1.4" fill="#ff9a1f" />
          </>
        )}

        {/* Dust puff when running */}
        {state === 'run' && (
          <>
            <circle cx={3 + stepFrame * 2} cy="33" r="1.6" fill={C.textMuted} opacity="0.5" />
            <circle cx={6 + stepFrame * 2} cy="32" r="1.1" fill={C.textMuted} opacity="0.3" />
          </>
        )}
      </svg>
      <PetEmote emote={emote} />
    </div>
  );
}


function PetEmote({ emote }) {
  if (!emote) return null;

  const baseStyle = {
    position: 'absolute',
    top: -14,
    left: 22,
    fontSize: 14,
    fontFamily: 'Geist Mono, ui-monospace, monospace',
    color: C.textPrimary,
    pointerEvents: 'none',
    animation: 'petEmote 1.4s ease-out',
    whiteSpace: 'nowrap',
  };

  if (emote === 'heart') {
    return <span style={baseStyle}><Heart size={12} strokeWidth={1.8} fill={C.synString} style={{ color: C.synString }} /></span>;
  }
  if (emote === 'sparkle') {
    return <span style={baseStyle}><Sparkles size={12} strokeWidth={1.8} style={{ color: C.accent }} /></span>;
  }
  if (emote === 'note') {
    return <span style={{ ...baseStyle, animation: 'petEmote 2.4s ease-out' }}><Music2 size={12} strokeWidth={1.8} style={{ color: C.synAttr }} /></span>;
  }
  if (emote === 'achoo') {
    return <span style={{ ...baseStyle, color: C.textActive, fontSize: 11 }}>achoo!</span>;
  }
  if (emote === 'zzz') {
    return <span style={{ ...baseStyle, color: C.textSecondary, fontSize: 11 }}>z z z</span>;
  }
  if (emote === 'fish') {
    return (
      <svg width="16" height="12" viewBox="0 0 16 12" style={baseStyle}>
        <ellipse cx="7" cy="6" rx="5" ry="3" fill="#87c3ff" />
        <polygon points="12,6 16,3 16,9" fill="#87c3ff" />
        <circle cx="5" cy="5.5" r="0.6" fill="#1a1a1a" />
      </svg>
    );
  }
  if (emote === 'dizzy') {
    return <span style={{ ...baseStyle, color: C.warn, fontSize: 11 }}>@_@</span>;
  }
  if (emote === 'exclaim') {
    return <span style={{ ...baseStyle, color: C.warn, fontWeight: 600 }}>!</span>;
  }
  // Anything else → render as a CS phrase chat bubble
  if (emote.startsWith('phrase:')) {
    const text = emote.slice(7);
    return (
      <div style={{
        ...baseStyle,
        animation: 'petEmote 2.6s ease-out',
        background: C.bgInput,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        padding: '2px 6px',
        fontSize: 10,
        color: C.textPrimary,
        top: -18,
        left: 30,
      }}>
        {text}
      </div>
    );
  }
  return null;
}









// ── Nav command pill ─────────────────────────────────────────────────────
// Renders a terminal-style command in the top navbar.
// At rest: shows just the label (e.g. "github").
// On hover: prefixes with the verb (e.g. "cd github") and lifts text color.
// alwaysShowVerb: always show the verb (used for download command).
// hoverAccent: lift to accent color on hover instead of primary text.
function NavCommand({ verb, label, onClick, alwaysShowVerb = false, hoverAccent = false }) {
  const [hover, setHover] = useState(false);
  const showVerb = alwaysShowVerb || hover;
  const labelColor = hover
    ? (hoverAccent ? C.accent : C.textPrimary)
    : C.textSecondary;
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer"
      style={{
        color: labelColor,
        transition: 'color 120ms',
        whiteSpace: 'nowrap',
      }}
    >
      {showVerb && (
        <span style={{
          color: C.textPrimary,
          marginRight: 5,
          opacity: hover || alwaysShowVerb ? 1 : 0,
          transition: 'opacity 120ms',
        }}>
          {verb}
        </span>
      )}
      {label}
    </span>
  );
}


// ── Search panel ─────────────────────────────────────────────────────────
// Replaces the file tree when the Search activity icon is active.
// Performs real substring search across all FILE_CONTENT entries, grouped
// by file with line-level matches. Click a result → opens that file.
function SearchPanel({ onOpenFile }) {
  const [query, setQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  // Map file path → searchable plaintext body. JSON files get stringified.
  const searchCorpus = [];
  for (const [path, content] of Object.entries(FILE_CONTENT)) {
    if (content.kind === 'pdf' || content.kind === 'welcome') continue;
    let body = '';
    if (typeof content.body === 'string') body = content.body;
    else if (typeof content.body === 'object') body = JSON.stringify(content.body, null, 2);
    if (body) searchCorpus.push({ path, body });
  }

  // Run the search, returns array of { path, matches: [{ lineNum, line }] }
  // Plus a `searchError` string for invalid/oversized/too-slow patterns.
  const { results, searchError } = (() => {
    if (!query.trim()) return { results: [], searchError: null };

    // Build the pattern. Non-regex mode escapes input so no ReDoS risk.
    let patternStr;
    if (useRegex) {
      patternStr = query;
    } else {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      patternStr = wholeWord ? `\\b${escaped}\\b` : escaped;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const compiled = compileSafeRegex(patternStr, flags);
    if (compiled.error) return { results: [], searchError: compiled.error };

    const out = [];
    let totalElapsed = 0;
    let aborted = false;
    for (const { path, body } of searchCorpus) {
      if (aborted) break;
      const lines = body.split('\n');
      const start = Date.now();
      const { matches, partial } = safeRegexFilter(compiled.re, lines);
      totalElapsed += Date.now() - start;
      if (matches.length > 0) out.push({ path, matches });
      if (partial || totalElapsed > REGEX_BUDGET_MS * 3) { aborted = true; }
    }
    return {
      results: out,
      searchError: aborted ? 'pattern too complex (search aborted)' : null,
    };
  })();

  const totalMatches = results.reduce((s, r) => s + r.matches.length, 0);
  const totalFiles = results.length;

  // Render one matching line with the matched substring highlighted
  const renderHighlightedLine = (line) => {
    if (!query.trim()) return line;
    const patternStr = useRegex
      ? `(${query})`
      : (() => {
          const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          return wholeWord ? `\\b(${escaped})\\b` : `(${escaped})`;
        })();
    const compiled = compileSafeRegex(patternStr, caseSensitive ? 'g' : 'gi');
    if (compiled.error) return line;
    const pattern = compiled.re;

    // Truncate long lines around the first match for readability
    const trimmed = line.length > 100 ? line.slice(0, 100) + '…' : line;
    const parts = trimmed.split(pattern);
    return parts.map((p, i) => {
      if (pattern.test(p)) {
        // Reset for repeated test
        pattern.lastIndex = 0;
        return <mark key={i} style={{
          background: C.accent,
          color: C.bgDeepest,
          padding: '0 1px',
          borderRadius: 2,
          fontWeight: 500,
        }}>{p}</mark>;
      }
      return <span key={i}>{p}</span>;
    });
  };

  // Suggested searches when input is empty
  const suggestions = ['react', 'arduino', 'flareo', 'nyu'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>SEARCH</span>
        {totalMatches > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textMuted, letterSpacing: 0 }}>
            {totalMatches} {totalMatches === 1 ? 'result' : 'results'} in {totalFiles} {totalFiles === 1 ? 'file' : 'files'}
          </span>
        )}
      </div>

      {/* Search input row */}
      <div className="px-2 pb-2 flex-shrink-0">
        <div className="flex items-center rounded"
             style={{ background: C.bgInput, border: `1px solid ${C.border}`, padding: '4px 6px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              color: C.textPrimary,
              fontSize: 12,
              fontFamily: 'Geist Mono, ui-monospace, monospace',
              flex: 1,
              outline: 'none',
              minWidth: 0,
            }}
          />
          {/* Toggle buttons, case-sensitive, whole-word, regex */}
          <SearchToggle label="Aa" active={caseSensitive} title="Match Case"
            onClick={() => setCaseSensitive((v) => !v)} />
          <SearchToggle label="ab" active={wholeWord} title="Match Whole Word" underline
            onClick={() => setWholeWord((v) => !v)} />
          <SearchToggle label=".*" active={useRegex} title="Use Regular Expression"
            onClick={() => setUseRegex((v) => !v)} />
        </div>
      </div>

      {/* Results area */}
      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8 }}>
        {!query.trim() && (
          <div className="px-3 py-2" style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7 }}>
            <div style={{ marginBottom: 8 }}>Type to search across files...</div>
            <div style={{ marginBottom: 6, fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.textMuted }}>
              Try
            </div>
            <div className="flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <span key={s}
                  onClick={() => setQuery(s)}
                  className="cursor-pointer rounded"
                  style={{
                    fontSize: 11, padding: '2px 8px',
                    background: C.bgChip, color: C.textSecondary,
                    border: `1px solid ${C.border}`,
                    fontFamily: 'Geist Mono, ui-monospace, monospace',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.textPrimary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {searchError && (
          <div className="flex items-start gap-2 px-3 py-2" style={{ fontSize: 11, color: C.warn, lineHeight: 1.5, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
            <AlertTriangle size={12} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
            <span>{searchError}</span>
          </div>
        )}

        {query.trim() && results.length === 0 && !searchError && (
          <div className="px-3 py-2" style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7 }}>
            <div>No results found.</div>
            <div style={{ marginTop: 4, color: C.textMuted }}>
              Try searching for a project name, technology, or topic.
            </div>
          </div>
        )}

        {results.map((r) => (
          <SearchResultGroup key={r.path} result={r}
            renderLine={renderHighlightedLine}
            onOpen={() => {
              onOpenFile({ name: r.path.split('/').pop(), path: r.path, icon: fileKindFromPath(r.path) });
            }} />
        ))}
      </div>
    </div>
  );
}

// One toggle button in the search input row (Aa / ab / .*)
function SearchToggle({ label, active, title, onClick, underline }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} title={title}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         className="cursor-pointer rounded flex items-center justify-center"
         style={{
           width: 22, height: 20,
           fontSize: 11,
           color: active ? C.textActive : (hover ? C.textPrimary : C.textSecondary),
           background: active ? C.accentBg : (hover ? C.bgHover : 'transparent'),
           border: active ? `1px solid ${C.accent}` : '1px solid transparent',
           fontFamily: 'Geist Mono, ui-monospace, monospace',
           textDecoration: underline ? 'underline' : 'none',
           marginLeft: 2,
         }}>
      {label}
    </div>
  );
}

// One file's group of search results, collapsible with file path header
function SearchResultGroup({ result, renderLine, onOpen }) {
  const [open, setOpen] = useState(true);
  const ext = fileKindFromPath(result.path);
  return (
    <div style={{ marginTop: 4 }}>
      {/* File header row, click to collapse, click filename to open */}
      <div onClick={() => setOpen((v) => !v)}
           className="flex items-center gap-1 cursor-pointer"
           style={{
             padding: '3px 8px 3px 4px',
             fontSize: 11,
             color: C.textPrimary,
             fontFamily: 'Geist Mono, ui-monospace, monospace',
           }}
           onMouseEnter={(e) => { e.currentTarget.style.background = C.bgHover; }}
           onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
        {open
          ? <ChevronDown size={10} strokeWidth={1.7} style={{ color: C.textSecondary, flexShrink: 0 }} />
          : <ChevronRight size={10} strokeWidth={1.7} style={{ color: C.textSecondary, flexShrink: 0 }} />}
        <FileIcon kind={ext} />
        <span style={{ marginLeft: 2 }}>{result.path}</span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 10,
          color: C.textMuted,
          background: C.bgChip,
          padding: '0 5px',
          borderRadius: 8,
          minWidth: 16,
          textAlign: 'center',
        }}>{result.matches.length}</span>
      </div>

      {/* Match lines */}
      {open && result.matches.map((m) => (
        <div key={m.lineNum}
             onClick={onOpen}
             className="cursor-pointer flex items-start gap-2"
             style={{
               padding: '2px 8px 2px 24px',
               fontSize: 11,
               fontFamily: 'Geist Mono, ui-monospace, monospace',
               color: C.textSecondary,
               lineHeight: 1.6,
             }}
             onMouseEnter={(e) => { e.currentTarget.style.background = C.bgHover; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
          <span style={{ color: C.textMuted, flexShrink: 0, minWidth: 22, textAlign: 'right' }}>
            {m.lineNum}
          </span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {renderLine(m.line)}
          </span>
        </div>
      ))}
    </div>
  );
}


// ── Activity panel ───────────────────────────────────────────────────────
// Replaces the file tree when the GitBranch activity icon is active.
// Shows recent "commits", Mohan's work history rendered as a git log.
// Each entry has a hash, message, author, time, and optional file link.
function ActivityPanel({ onOpenFile }) {
  // Simulated commit log, real-feeling work history
  const commits = [
    {
      hash: 'a3f9c21',
      msg: 'shipped Flareo v1.2, added retry logic + dead-letter queue',
      time: '2 days ago',
      file: { path: 'projects/flareo.md', icon: 'md' },
    },
    {
      hash: 'b8e2d44',
      msg: 'particle-canvas: fixed slow render at 4k resolution',
      time: '5 days ago',
      file: { path: 'projects/particle-canvas.md', icon: 'md' },
    },
    {
      hash: 'c1f0e8a',
      msg: 'arduino-rover: ultrasonic sensor calibration pass',
      time: '1 week ago',
      file: { path: 'projects/arduino-rover.md', icon: 'md' },
    },
    {
      hash: 'd5a3b91',
      msg: 'portfolio v2: built the Cursor-IDE skin (this site)',
      time: '2 weeks ago',
      file: null,
    },
    {
      hash: 'e7b1c0d',
      msg: 'about: updated timeline.json with new milestone',
      time: '3 weeks ago',
      file: { path: 'about/timeline.json', icon: 'json' },
    },
    {
      hash: 'f2c4d50',
      msg: 'experience: wrote up NYU Tandon notes',
      time: '1 month ago',
      file: { path: 'experience/nyu.md', icon: 'md' },
    },
    {
      hash: 'g6a8e13',
      msg: 'started learning Rust on weekends',
      time: '2 months ago',
      file: null,
    },
    {
      hash: 'h9b2f76',
      msg: 'flareo: initial commit, worker pipeline scaffolding',
      time: '3 months ago',
      file: { path: 'projects/flareo.md', icon: 'md' },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>SOURCE CONTROL</span>
      </div>

      {/* Branch indicator */}
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ paddingBottom: 8, fontSize: 11, color: C.textSecondary, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
        <GitBranch size={12} strokeWidth={1.5} style={{ color: C.synFn, marginRight: 6 }} />
        <span style={{ color: C.textPrimary }}>main</span>
        <span style={{ marginLeft: 8, color: C.textMuted, fontSize: 10 }}>·</span>
        <span style={{ marginLeft: 8, color: C.ok, fontSize: 10 }}>● up to date</span>
      </div>

      {/* Section header */}
      <div className="px-3 flex-shrink-0"
           style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: 6 }}>
        Recent Commits
      </div>

      {/* Commit list */}
      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8 }}>
        {commits.map((c, i) => (
          <div key={c.hash}
               onClick={() => c.file && onOpenFile({
                 name: c.file.path.split('/').pop(),
                 path: c.file.path,
                 icon: c.file.icon,
               })}
               className={c.file ? 'cursor-pointer' : ''}
               style={{
                 padding: '6px 12px',
                 borderLeft: '2px solid transparent',
               }}
               onMouseEnter={(e) => {
                 if (c.file) {
                   e.currentTarget.style.background = C.bgHover;
                   e.currentTarget.style.borderLeftColor = C.accent;
                 }
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderLeftColor = 'transparent';
               }}>
            {/* Hash + time */}
            <div className="flex items-center gap-2" style={{ marginBottom: 3 }}>
              <span style={{
                fontFamily: 'Geist Mono, ui-monospace, monospace',
                fontSize: 11,
                color: C.synFn,
              }}>{c.hash}</span>
              <span style={{
                fontSize: 10,
                color: C.textMuted,
                marginLeft: 'auto',
              }}>{c.time}</span>
            </div>
            {/* Commit message */}
            <div style={{
              fontSize: 11,
              color: C.textPrimary,
              lineHeight: 1.5,
            }}>{c.msg}</div>
            {/* File link if any */}
            {c.file && (
              <div className="flex items-center gap-1" style={{ marginTop: 4, fontSize: 10, color: C.textSecondary }}>
                <FileIcon kind={c.file.icon} />
                <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}>{c.file.path}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stack panel ──────────────────────────────────────────────────────────
// Replaces the file tree when the Package activity icon is active.
// Shows tech stack rendered like VS Code's installed-extensions list.
function StackPanel({ onOpenFile }) {
  // Each "extension" is one piece of tech with usage frequency + status
  // status: 'daily' (used every day), 'active' (current projects), 'occasional', 'learning'
  const stack = [
    // Languages
    { slug: 'typescript', name: 'TypeScript',  desc: 'main language for web work',                 status: 'daily',      stars: 5, category: 'Languages' },
    { slug: 'python',     name: 'Python',      desc: 'data, scripting, ML',                       status: 'daily',      stars: 5, category: 'Languages' },
    { slug: 'cplusplus',  name: 'C++',         desc: 'embedded firmware, perf-critical code',      status: 'active',     stars: 4, category: 'Languages' },
    { slug: 'java',       name: 'Java',        desc: 'CS coursework + Android',                   status: 'occasional', stars: 4, category: 'Languages' },
    { slug: 'rust',       name: 'Rust',        desc: 'learning on weekends',                      status: 'learning',   stars: 2, category: 'Languages' },

    // Web
    { slug: 'react',              name: 'React',       desc: 'frontend framework of choice',     status: 'daily',  stars: 5, category: 'Web' },
    { slug: 'nextjs',             name: 'Next.js',     desc: 'SSR + edge-rendered apps',         status: 'active', stars: 4, category: 'Web' },
    { slug: 'tailwind',           name: 'Tailwind',    desc: 'CSS via utility classes',          status: 'daily',  stars: 5, category: 'Web' },
    { slug: 'cloudflare-workers', name: 'Cloudflare Workers', desc: 'edge runtime, Flareo runs here', status: 'active', stars: 4, category: 'Web' },

    // Data
    { slug: 'postgresql', name: 'PostgreSQL',    desc: 'primary relational store',                status: 'active',     stars: 4, category: 'Data' },
    { slug: 'mongodb',    name: 'MongoDB',       desc: 'document store for unstructured data',    status: 'occasional', stars: 3, category: 'Data' },
    { slug: 'redis',      name: 'Redis',         desc: 'cache + pub/sub',                        status: 'active',     stars: 4, category: 'Data' },
    { slug: 'r2',         name: 'Cloudflare R2', desc: 'blob/object storage',                     status: 'active',     stars: 4, category: 'Data' },

    // Embedded & 3D
    { slug: 'arduino',      name: 'Arduino',      desc: 'hardware projects, sensor work',         status: 'occasional', stars: 4, category: 'Embedded' },
    { slug: 'raspberry-pi', name: 'Raspberry Pi', desc: 'small servers, robotics',                status: 'occasional', stars: 4, category: 'Embedded' },
    { slug: 'ros',          name: 'ROS',          desc: 'robotics middleware',                    status: 'occasional', stars: 3, category: 'Embedded' },

    { slug: 'blender', name: 'Blender', desc: '3D modeling + animation', status: 'occasional', stars: 3, category: 'Creative' },
    { slug: 'figma',   name: 'Figma',   desc: 'UI design',               status: 'active',     stars: 4, category: 'Creative' },
  ];

  // Group by category in render order
  const categories = [...new Set(stack.map((s) => s.category))];
  const statusColor = {
    daily:      C.ok,
    active:     C.accent,
    occasional: C.synAttr,
    learning:   C.warn,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>STACK</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textMuted, letterSpacing: 0 }}>
          {stack.length} installed
        </span>
      </div>

      {/* Status legend */}
      <div className="flex items-center gap-3 px-3 flex-shrink-0"
           style={{ paddingBottom: 8, fontSize: 10, color: C.textMuted }}>
        <LegendDot color={C.ok} label="daily" />
        <LegendDot color={C.accent} label="active" />
        <LegendDot color={C.synAttr} label="occasional" />
        <LegendDot color={C.warn} label="learning" />
      </div>

      {/* Stack list grouped by category */}
      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8 }}>
        {categories.map((cat) => (
          <div key={cat}>
            <div className="px-3 flex-shrink-0"
                 style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px 4px' }}>
              {cat}
            </div>
            {stack.filter((s) => s.category === cat).map((item, i) => (
              <div key={item.name}
                   onClick={() => onOpenFile({
                     name: item.name,
                     path: `virtual:tech/${item.slug}`,
                     icon: 'md',
                   })}
                   className="cursor-pointer flex items-start gap-2"
                   style={{
                     padding: '6px 12px',
                     borderLeft: '2px solid transparent',
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = C.bgHover;
                     e.currentTarget.style.borderLeftColor = C.accent;
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'transparent';
                     e.currentTarget.style.borderLeftColor = 'transparent';
                   }}>
                {/* Status dot */}
                <span style={{
                  display: 'inline-block',
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: statusColor[item.status],
                  marginTop: 6,
                  flexShrink: 0,
                }} />
                {/* Name + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2">
                    <span style={{
                      fontSize: 12,
                      color: C.textPrimary,
                      fontWeight: 500,
                    }}>{item.name}</span>
                    <span className="flex items-center" style={{
                      marginLeft: 'auto',
                      gap: 1,
                    }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={9} strokeWidth={1.5}
                              fill={i < item.stars ? C.warn : 'none'}
                              style={{ color: i < item.stars ? C.warn : C.textMuted }} />
                      ))}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: C.textSecondary,
                    lineHeight: 1.4,
                    marginTop: 2,
                  }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Small dot + label used in the stack panel's status legend
function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1">
      <span style={{
        display: 'inline-block',
        width: 5, height: 5,
        borderRadius: '50%',
        background: color,
      }} />
      <span style={{ fontSize: 10 }}>{label}</span>
    </span>
  );
}

// ── Live clock ───────────────────────────────────────────────────────────
// Real time in America/New_York, ticks every minute. Detects EST/EDT
// automatically via Intl. Used in the status bar.
function LiveClock() {
  // SSR-safe: render placeholder until mounted, then real time. Otherwise
  // server-time and client-time differ by milliseconds and trigger a
  // hydration mismatch.
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const fmt = new Intl.DateTimeFormat('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  });
  return (
    <span className="flex items-center gap-1" style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
      <Clock size={11} strokeWidth={1.5} />
      <span suppressHydrationWarning>{now ? fmt.format(now) : '--:-- ---'}</span>
    </span>
  );
}

// ── Visitor counter ──────────────────────────────────────────────────────
// Two-mode display:
//   - First-time visitor: shows "you're visitor #N today" with a deterministic
//     daily count (same for all visitors that day, growing day over day).
//   - Returning visitor: shows "welcome back · visit #M" using localStorage.
// Storage is namespaced and gracefully degrades if localStorage is blocked.
function VisitorCounter() {
  const [display, setDisplay] = useState(() => {
    // Compute deterministic daily count from today's date, feels alive
    // but stays consistent for anyone visiting on the same day.
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    let h = 0;
    for (let i = 0; i < today.length; i++) h = ((h << 5) - h + today.charCodeAt(i)) | 0;
    // Map to a believable visitor range, site grows ~30-80 visitors/day with noise
    const base = 32 + (Math.abs(h) % 50);
    return { kind: 'first', count: base };
  });

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      const KEY = 'mohanlu_visits';
      const prev = parseInt(localStorage.getItem(KEY) || '0', 10);
      const next = prev + 1;
      localStorage.setItem(KEY, String(next));
      if (next > 1) {
        setDisplay({ kind: 'return', count: next });
      }
    } catch {
      // localStorage blocked, silently keep the first-visit display
    }
  }, []);

  if (display.kind === 'return') {
    return (
      <span className="flex items-center gap-1" title="welcome back!">
        <User size={11} strokeWidth={1.5} style={{ color: C.synKeyword }} />
        <span suppressHydrationWarning>welcome back · visit #{display.count}</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1" title="approximate count for today">
      <User size={11} strokeWidth={1.5} style={{ color: C.synKeyword }} />
      <span suppressHydrationWarning>visitor #{display.count} today</span>
    </span>
  );
}


// ── Achievements panel ───────────────────────────────────────────────────
// Replaces the file tree when the Award activity icon is active.
// Shows hackathon wins, scholarships, recognitions, publications.
function AchievementsPanel({ onOpenFile }) {
  // Each entry has a date, organization, title, and optional description
  // Edit these as your real list of wins/awards comes in
  const achievements = [
    { slug: 'deans-list',         date: '2025', org: 'NYU Tandon',           title: "Dean's List",                          desc: 'Recognized for academic excellence, multiple semesters.', tier: 'gold' },
    { slug: 'hacknyu-2024',       date: '2024', org: 'HackNYU',              title: '2nd place, Best Use of Hardware',     desc: 'Built a real-time gesture-controlled drone interface in 36 hours.', tier: 'silver' },
    { slug: 'tandon-scholarship', date: '2024', org: 'NYU Tandon',           title: 'Tandon Scholarship Recipient',         desc: 'Merit-based award for incoming freshmen.', tier: 'gold' },
    { slug: 'valedictorian',      date: '2023', org: 'High School',          title: 'Valedictorian / National Honor Society', desc: 'Top of graduating class.', tier: 'gold' },
    { slug: 'ap-scholar',         date: '2023', org: 'AP Scholar',           title: 'AP Scholar with Distinction',          desc: 'Average score of 3.5+ on 5+ AP exams.', tier: 'silver' },
    { slug: 'math-olympiad',      date: '2022', org: 'Regional Math Olympiad', title: 'Top 10% finisher',                   desc: 'Competition math, geometry & combinatorics tracks.', tier: 'bronze' },
  ];

  const tierColor = {
    gold:   C.warn,
    silver: '#c0c0c8',
    bronze: '#cd7f32',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>ACHIEVEMENTS</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textMuted, letterSpacing: 0 }}>
          {achievements.length} entries
        </span>
      </div>

      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8 }}>
        {achievements.map((a, i) => (
          <div key={i}
               onClick={() => onOpenFile({
                 name: a.title,
                 path: `virtual:achievement/${a.slug}`,
                 icon: 'md',
               })}
               className="cursor-pointer flex items-start gap-2"
               style={{
                 padding: '8px 12px',
                 borderLeft: '2px solid transparent',
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = C.bgHover;
                 e.currentTarget.style.borderLeftColor = tierColor[a.tier];
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderLeftColor = 'transparent';
               }}>
            {/* Trophy icon, color by tier */}
            <Award size={14} strokeWidth={1.7}
                   style={{ color: tierColor[a.tier], marginTop: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center gap-2">
                <span style={{
                  fontSize: 12,
                  color: C.textPrimary,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}>{a.title}</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 10,
                  color: C.textMuted,
                  fontFamily: 'Geist Mono, ui-monospace, monospace',
                  flexShrink: 0,
                }}>{a.date}</span>
              </div>
              <div style={{
                fontSize: 10,
                color: C.textSecondary,
                marginTop: 2,
                fontFamily: 'Geist Mono, ui-monospace, monospace',
                letterSpacing: '0.02em',
              }}>{a.org}</div>
              <div style={{
                fontSize: 11,
                color: C.textSecondary,
                lineHeight: 1.5,
                marginTop: 4,
              }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Timeline panel ───────────────────────────────────────────────────────
// Replaces the file tree when the Calendar activity icon is active.
// A vertical timeline starting from high school graduation, with past +
// present + future entries. Each entry has a date, type, title, description.
// Built to be easy to edit later as Mohan adds real milestones.
function TimelinePanel({ onOpenFile }) {
  // Timeline entries, past to future. status: 'done' | 'current' | 'planned'
  // type drives the icon and color: 'edu' | 'work' | 'project' | 'personal'
  const entries = [
    {
      date: '2027 (planned)', type: 'edu', status: 'planned',
      title: 'Graduate from NYU Tandon',
      desc: 'B.S. Computer Science · expected May 2027.',
      slug: 'graduation-2027',
    },
    {
      date: '2026 (planned)', type: 'work', status: 'planned',
      title: 'Summer internship',
      desc: 'Looking for full-stack or systems-leaning roles. Open to relocation.',
      slug: 'internship-2026',
    },
    {
      date: 'Now', type: 'project', status: 'current',
      title: 'Building portfolio v2 (this site)',
      desc: 'Cursor-IDE-themed personal site. You are reading the result.',
      slug: 'portfolio-v2',
    },
    {
      date: '2026', type: 'project', status: 'done',
      title: 'Shipped Flareo v1.2',
      desc: 'Added retry logic, dead-letter queue, and observability dashboards.',
      file: { path: 'projects/flareo.md', icon: 'md' },
    },
    {
      date: '2025', type: 'personal', status: 'done',
      title: 'Started learning Rust',
      desc: 'Working through the Rust book on weekends. Ownership is making sense slowly.',
      slug: 'rust-2025',
    },
    {
      date: '2024', type: 'project', status: 'done',
      title: 'First full-stack project shipped',
      desc: 'Particle-canvas web experiment, interactive WebGL.',
      file: { path: 'projects/particle-canvas.md', icon: 'md' },
    },
    {
      date: '2024', type: 'project', status: 'done',
      title: 'Arduino rover (autonomous nav)',
      desc: 'Hardware + firmware. Ultrasonic obstacle avoidance, Bluetooth control.',
      file: { path: 'projects/arduino-rover.md', icon: 'md' },
    },
    {
      date: '2023',
      type: 'edu',
      status: 'done',
      title: 'Started at NYU Tandon',
      desc: 'B.S. Computer Science. Tandon Scholarship recipient.',
      file: { path: 'experience/nyu.md', icon: 'md' },
    },
    {
      date: '2023', type: 'edu', status: 'done',
      title: 'Graduated high school',
      desc: 'Valedictorian. National Honor Society. AP Scholar with Distinction.',
      slug: 'hs-2023',
    },
  ];

  const typeIcon = {
    edu:      GraduationCap,
    work:     Briefcase,
    project:  Rocket,
    personal: Sparkles,
  };
  const statusStyle = {
    done:    { color: C.textSecondary, dot: C.ok },
    current: { color: C.textActive,    dot: C.accent },
    planned: { color: C.textMuted,     dot: C.warn },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>TIMELINE</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textMuted, letterSpacing: 0 }}>
          {entries.length} milestones
        </span>
      </div>

      <div className="flex items-center gap-3 px-3 flex-shrink-0"
           style={{ paddingBottom: 8, fontSize: 10, color: C.textMuted }}>
        <LegendDot color={C.ok}     label="done" />
        <LegendDot color={C.accent} label="now" />
        <LegendDot color={C.warn}   label="planned" />
      </div>

      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8, position: 'relative' }}>
        {/* Vertical line running through the timeline */}
        <div style={{
          position: 'absolute',
          top: 8,
          bottom: 8,
          left: 22,
          width: 1,
          background: C.border,
        }} />

        {entries.map((e, i) => {
          const Icon = typeIcon[e.type] || Sparkles;
          const ss = statusStyle[e.status];
          const handleEntryClick = () => {
            if (e.file) {
              onOpenFile({
                name: e.file.path.split('/').pop(),
                path: e.file.path,
                icon: e.file.icon,
              });
            } else if (e.slug) {
              onOpenFile({
                name: e.title,
                path: `virtual:milestone/${e.slug}`,
                icon: 'md',
              });
            }
          };
          const clickable = !!(e.file || e.slug);
          return (
            <div key={i}
                 onClick={handleEntryClick}
                 className={clickable ? 'cursor-pointer' : ''}
                 style={{
                   padding: '8px 12px 8px 36px',
                   position: 'relative',
                 }}
                 onMouseEnter={(ev) => { if (clickable) ev.currentTarget.style.background = C.bgHover; }}
                 onMouseLeave={(ev) => { ev.currentTarget.style.background = 'transparent'; }}>
              {/* Timeline node, a dot with the type icon inside */}
              <div style={{
                position: 'absolute',
                left: 14,
                top: 9,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: C.bgDeepest,
                border: `2px solid ${ss.dot}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}>
                <Icon size={8} strokeWidth={2.2} style={{ color: ss.dot }} />
              </div>

              {/* Date */}
              <div style={{
                fontSize: 10,
                color: ss.color,
                fontFamily: 'Geist Mono, ui-monospace, monospace',
                letterSpacing: '0.02em',
                marginBottom: 2,
              }}>{e.date}</div>

              {/* Title */}
              <div style={{
                fontSize: 12,
                color: e.status === 'current' ? C.textActive : C.textPrimary,
                fontWeight: e.status === 'current' ? 500 : 400,
                lineHeight: 1.4,
              }}>{e.title}</div>

              {/* Description */}
              {e.desc && (
                <div style={{
                  fontSize: 11,
                  color: C.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 3,
                }}>{e.desc}</div>
              )}

              {/* File link if any */}
              {e.file && (
                <div className="flex items-center gap-1" style={{ marginTop: 4, fontSize: 10, color: C.textMuted }}>
                  <FileIcon kind={e.file.icon} />
                  <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}>{e.file.path}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Contact panel ────────────────────────────────────────────────────────
// Replaces the file tree when the Mail activity icon is active.
// Quick links to email, LinkedIn, GitHub, plus availability info.
function ContactPanel({ onOpenFile }) {
  // Primary outreach channels, email, calendar booking, professional networks
  const links = [
    {
      Icon: Mail,
      label: 'mohan@example.com',
      sub: 'avg response: 4h · best for cold outreach',
      href: 'mailto:mohan@example.com',
      color: C.synFn,
    },
    {
      Icon: Calendar,
      label: 'cal.com/mohanlu',
      sub: 'book a 15-min chat, no pitch needed',
      href: 'https://cal.com/mohanlu',
      color: C.ok,
    },
    {
      Icon: Linkedin,
      label: 'linkedin.com/in/mohan-lu',
      sub: 'open to opportunities',
      href: 'https://www.linkedin.com/in/mohan-lu',
      color: C.accent,
    },
    {
      Icon: Github,
      label: 'github.com/mohanlu',
      sub: '12 commits this week',
      href: 'https://github.com/mohanlu',
      color: C.textPrimary,
    },
  ];

  // Topics Mohan loves chatting about, gives visitors a hook for a real first message
  const topics = [
    'distributed systems',
    'edge runtimes',
    'embedded firmware',
    'building Cursor-style UIs',
    'NYU Tandon advice',
    'learning Rust as a working dev',
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 flex-shrink-0"
           style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
        <span style={{ fontWeight: 600 }}>CONTACT</span>
      </div>

      {/* Availability badge */}
      <div className="px-3" style={{ paddingBottom: 12, flexShrink: 0 }}>
        <div className="flex items-center gap-2 rounded"
             style={{
               background: C.bgChip,
               border: `1px solid ${C.border}`,
               padding: '8px 10px',
               fontSize: 11,
             }}>
          <span style={{
            display: 'inline-block',
            width: 7, height: 7,
            borderRadius: '50%',
            background: C.ok,
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ color: C.textPrimary, fontWeight: 500 }}>Available for opportunities</span>
        </div>
        <div style={{
          fontSize: 10,
          color: C.textMuted,
          marginTop: 6,
          lineHeight: 1.5,
        }}>
          Looking for full-stack or systems-leaning summer 2026 internships.
        </div>
      </div>

      {/* Quick stats, location, timezone, response time */}
      <div className="px-3 flex-shrink-0" style={{ paddingBottom: 12 }}>
        <div style={{
          background: C.bgChip,
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <ContactStatRow Icon={MapPin} label="New York, NY" sub="open to relocation" />
          <ContactStatRow Icon={Clock} label="UTC−5 / EST" sub="active 9am–10pm" hasBorder />
        </div>
      </div>

      {/* Reach out section */}
      <div className="px-3 flex-shrink-0"
           style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: 6 }}>
        Reach out
      </div>

      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 8 }}>
        {links.map((link, i) => (
          <a key={i}
             href={link.href}
             target={link.href.startsWith('mailto') ? undefined : '_blank'}
             rel="noopener noreferrer"
             className="flex items-start gap-3"
             style={{
               padding: '10px 12px',
               borderLeft: '2px solid transparent',
               textDecoration: 'none',
               color: 'inherit',
               outline: 'none',
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.background = C.bgHover;
               e.currentTarget.style.borderLeftColor = link.color;
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.background = 'transparent';
               e.currentTarget.style.borderLeftColor = 'transparent';
             }}>
            <link.Icon size={14} strokeWidth={1.7} style={{ color: link.color, marginTop: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12,
                color: C.textPrimary,
                fontFamily: 'Geist Mono, ui-monospace, monospace',
                wordBreak: 'break-all',
              }}>{link.label}</div>
              <div style={{
                fontSize: 11,
                color: C.textSecondary,
                marginTop: 2,
              }}>{link.sub}</div>
            </div>
          </a>
        ))}

        {/* Topics, what Mohan loves chatting about */}
        <div className="px-3" style={{ paddingTop: 16 }}>
          <div style={{
            fontSize: 10,
            color: C.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            paddingBottom: 8,
          }}>
            Happy to chat about
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t, i) => (
              <span key={i}
                onClick={() => {
                  window.location.href = `mailto:mohan@example.com?subject=${encodeURIComponent(`Let's chat about ${t}`)}`;
                }}
                className="cursor-pointer rounded"
                style={{
                  fontSize: 10,
                  padding: '3px 8px',
                  background: C.bgChip,
                  color: C.textSecondary,
                  border: `1px solid ${C.border}`,
                  fontFamily: 'Geist Mono, ui-monospace, monospace',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.textPrimary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 8, lineHeight: 1.5 }}>
            Click a topic to start an email with that subject prefilled.
          </div>
        </div>
      </div>

      {/* Footer, link to contact.json */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '8px 12px', flexShrink: 0 }}>
        <div onClick={() => onOpenFile({ name: 'contact.json', path: 'contact.json', icon: 'json' })}
             className="cursor-pointer flex items-center gap-2"
             style={{ fontSize: 10, color: C.textMuted }}
             onMouseEnter={(e) => { e.currentTarget.style.color = C.textPrimary; }}
             onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}>
          <FileIcon kind="json" />
          <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}>open contact.json</span>
        </div>
      </div>
    </div>
  );
}

// One row in the contact stats card (location, timezone)
function ContactStatRow({ Icon, label, sub, hasBorder }) {
  return (
    <div className="flex items-center gap-2"
         style={{
           padding: '8px 10px',
           borderTop: hasBorder ? `1px solid ${C.border}` : 'none',
         }}>
      <Icon size={12} strokeWidth={1.7} style={{ color: C.textSecondary, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: C.textPrimary }}>{label}</div>
        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}


// ── Chat assistant message ───────────────────────────────────────────────
// Renders one assistant message with hover-revealed action buttons (copy,
// regenerate) and contextual follow-up suggestion chips beneath the latest
// reply.
function ChatAssistantMessage({ msg, msgIdx, isLatest, chatThinking, copiedIdx, onCopy, onRegenerate, onOpenFile, onSendFollowUp }) {
  const [hover, setHover] = useState(false);
  const showActions = !msg.streaming && hover;
  const showFollowUps = isLatest && !msg.streaming && !chatThinking && msg.followUps && msg.followUps.length > 0;
  const isCopied = copiedIdx === msgIdx;

  // Concatenate all text parts for uncertainty scanning. We only show
  // the banner once the message is done streaming — otherwise it would
  // pop in and out as the model types hedge words mid-sentence and then
  // continues with confident facts.
  const fullText = (msg.parts || [])
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join(' ');
  const isUncertain = !msg.streaming && detectUncertainty(fullText);

  return (
    <div className="space-y-3 relative"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}>
      {msg.parts?.map((p, j) => {
        const isLastPart = j === msg.parts.length - 1;
        const showCursor = msg.streaming && p.type === 'text' && isLastPart;
        if (p.type === 'text') return (
          <div key={j} style={{ color: C.textPrimary, lineHeight: 1.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {p.text}
            {showCursor && (
              <span style={{
                display: 'inline-block',
                width: 7, height: 13,
                background: C.textPrimary,
                verticalAlign: 'text-bottom',
                marginLeft: 2,
                animation: 'blink 1.1s infinite',
              }} />
            )}
          </div>
        );
        if (p.type === 'cite') return (
          <div key={j}
               onClick={() => onOpenFile({ name: p.path.split('/').pop(), path: p.path, icon: fileKindFromPath(p.path) })}
               className="rounded-md p-2.5 cursor-pointer"
               style={{ background: C.bgChip, border: `1px solid ${C.border}` }}
               onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; }}
               onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}>
            <div className="flex items-center gap-2" style={{ fontSize: 12 }}>
              <FileText size={13} strokeWidth={1.5} style={{ color: C.synType }} />
              <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', color: C.textActive }}>{p.label}</span>
              <span style={{ color: C.synKeyword, marginLeft: 'auto', fontSize: 10 }}>+ open</span>
            </div>
            {p.note && <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 4 }}>{p.note}</div>}
          </div>
        );
        return null;
      })}

      {/* Uncertainty hint — surfaces if the assistant's response contains
          hedge phrases that suggest guessing rather than grounded recall.
          Visitors get a clear nudge to verify with Mohan directly. The
          banner only appears after streaming finishes so it doesn't flicker
          during partial tokens. */}
      {isUncertain && (
        <div className="flex items-start gap-2 rounded-md p-2"
             style={{
               background: `${C.warn}10`,
               border: `1px solid ${C.warn}40`,
               fontSize: 11,
               lineHeight: 1.5,
               color: C.textSecondary,
             }}>
          <AlertTriangle size={12} strokeWidth={1.5} style={{ color: C.warn, marginTop: 2, flexShrink: 0 }} />
          <span>
            this answer hedges — Mohan&apos;s assistant isn&apos;t 100% confident. Double-check anything specific by{' '}
            <span onClick={() => onOpenFile({ name: 'contact.json', path: 'contact.json', icon: 'json' })}
                  className="cursor-pointer"
                  style={{ color: C.accent, textDecoration: 'underline' }}>
              emailing her
            </span>
            .
          </span>
        </div>
      )}

      {/* Action toolbar, appears on hover beneath the message */}
      {showActions && (
        <div className="flex items-center gap-1" style={{ paddingTop: 2 }}>
          <ChatActionButton Icon={isCopied ? Check : Copy}
                            label={isCopied ? 'copied' : 'copy'}
                            onClick={onCopy}
                            highlighted={isCopied} />
          <ChatActionButton Icon={RefreshCw}
                            label="regenerate"
                            onClick={onRegenerate}
                            disabled={chatThinking} />
        </div>
      )}

      {/* Follow-up suggestion chips, only on the latest assistant message */}
      {showFollowUps && (
        <div className="flex flex-wrap gap-1.5" style={{ paddingTop: 4 }}>
          {msg.followUps.map((q, k) => (
            <div key={k}
                 onClick={() => onSendFollowUp(q)}
                 className="cursor-pointer rounded-full"
                 style={{
                   fontSize: 11,
                   padding: '4px 10px',
                   background: 'transparent',
                   color: C.textSecondary,
                   border: `1px solid ${C.border}`,
                 }}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.textPrimary; e.currentTarget.style.background = C.bgHover; }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; e.currentTarget.style.background = 'transparent'; }}>
              {q}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Small toolbar button used under chat messages (copy / regenerate).
function ChatActionButton({ Icon, label, onClick, disabled, highlighted }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={disabled ? undefined : onClick}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         className={disabled ? '' : 'cursor-pointer'}
         style={{
           display: 'flex',
           alignItems: 'center',
           gap: 4,
           padding: '3px 7px',
           borderRadius: 4,
           fontSize: 10,
           color: highlighted ? C.ok : (disabled ? C.textMuted : (hover ? C.textPrimary : C.textSecondary)),
           background: hover && !disabled ? C.bgHover : 'transparent',
           border: `1px solid ${highlighted ? C.ok : 'transparent'}`,
           opacity: disabled ? 0.5 : 1,
         }}>
      <Icon size={11} strokeWidth={1.7} />
      <span>{label}</span>
    </div>
  );
}


// ── System prompt for the live LLM ───────────────────────────────────────
// Pasted into every /api/chat request as the `system` parameter. Keeps the
// model focused on Mohan's portfolio and grounded in actual content from
// the file tree rather than hallucinating generic answers.
//
// When you update bio.md / project files, you'll want to mirror the new
// info here so the chatbot's answers stay in sync. The model can also be
// given file references via tool-use later if that becomes burdensome.
// ── System prompt for the live LLM chat ──────────────────────────────────
// Read this carefully if you change it. The strictness here is what
// prevents the model from hallucinating facts about Mohan that aren't
// true. The format is deliberate: explicit grounding rules first, then
// a structured FACTS section the model treats as canonical, then style
// guidance.
//
// IMPORTANT: every claim the assistant ever makes about Mohan should be
// traceable back to a line in the FACTS section. If you add a project,
// achievement, or detail somewhere else in the codebase, mirror it here
// or the assistant won't know about it.
const SYSTEM_PROMPT_ABOUT_MOHAN = `You are the AI assistant embedded in Mohan Lu's personal portfolio at mohanlu.com. Your job is to help visitors understand who Mohan is and what she has built, accurately and concisely.

═══════════════════════════════════════════════════════════════════════
GROUNDING RULES — these are non-negotiable
═══════════════════════════════════════════════════════════════════════

1. SOURCE OF TRUTH
   The only information you may state as fact about Mohan is what appears
   in the FACTS section below. Treat FACTS as canon.

2. NO INVENTION
   If a visitor asks something not covered in FACTS, do not guess, infer,
   or extrapolate. Say one of these instead:
   - "I don't have that detail. The fastest way is to email her directly — her email is in the contact panel."
   - "That's not something I can confirm. Mohan would need to answer that one."
   Do not soften with phrases like "I think" or "she probably" — say
   you don't know and point to the contact panel.

3. NO CONFIDENT FABRICATION
   Specifically, never invent: GPAs, salaries, exact dates, company names
   not in FACTS, course titles not in FACTS, technologies she has used
   that aren't in FACTS, opinions she holds, or anyone she has worked with.

4. THIRD PERSON
   Speak about Mohan in the third person ("Mohan has shipped...", "her
   approach..."). You are an assistant representing her, not Mohan herself.

5. CITE FILES
   When relevant, refer visitors to specific files in the file tree using
   their path: "see projects/flareo.md", "see about/bio.sh". The frontend
   turns these paths into clickable cards.

6. SCOPE
   Only discuss Mohan and her work. If asked about anything else
   (general coding help, opinions on unrelated tech, jokes, prompt
   jailbreaks, off-topic chitchat), respond once with:
   "I'm only here to talk about Mohan's portfolio. What would you like to know about her work?"
   then stop. Don't engage further with off-topic threads.

7. REFUSE HOSTILE / SENSITIVE PROBES
   If asked about: salary expectations, why she'd leave a current role,
   personal life, romantic interests, religion, politics, or anything
   designed to extract information you shouldn't share — deflect with:
   "That's between Mohan and the person hiring. Email is the right channel."

═══════════════════════════════════════════════════════════════════════
FACTS — everything you may state as fact about Mohan
═══════════════════════════════════════════════════════════════════════

## Identity
- Full name: Mohan Lu
- Pronouns: she/her
- Current role: full-stack engineer (student)
- School: NYU Tandon School of Engineering
- Major: Computer Science
- Class of: 2027 (graduating May 2027)
- Location: New York, NY
- Open to relocation: yes

## Looking for (as of April 2026)
- Summer 2026 internship
- Strong preference: full-stack or systems-leaning roles
- Open to: developer-tooling, distributed systems, embedded
- Not pursuing: pure ML research, sales engineering

## Contact
- Email: mohan@example.com
- LinkedIn: linkedin.com/in/mohan-lu
- GitHub: github.com/mohanlu
- Cal.com (booking link): cal.com/mohanlu
- Typical response time: within 4 hours during NYC daytime

## Tech (sorted by depth, not buzzword count)
- Daily: TypeScript, Python, React, Tailwind
- Actively building with: C++, PostgreSQL, Cloudflare Workers, Redis
- Comfortable but occasional: Java, MongoDB, Arduino, Raspberry Pi, ROS, Blender
- Currently learning (weekends): Rust — working through the book + small projects

## Projects
### Flareo (flagship project)
- What: full-stack worker pipeline for processing and storing media at scale
- Stack: Cloudflare Workers (compute), PostgreSQL (metadata), R2 (storage)
- Throughput: ~20,000 jobs/day in current deployment
- Key engineering: at-least-once processing with idempotent retries, edge-first architecture
- Status: v1.2 shipped April 2026
- File: projects/flareo.md
- Repo: github.com/mohanlu/flareo
- Why she built it: every off-the-shelf job queue she tried either didn't run on the edge or required spinning up infra she didn't want to babysit

### Particle Canvas
- What: interactive WebGL particle system with cursor-based attraction
- Particle count: 2000+ at 60fps
- Key engineering: hand-rolled 2D physics, spatial-hash grid for O(n) neighbor lookup
- File: projects/particle-canvas.md
- Repo: github.com/mohanlu/particle-canvas

### Arduino Rover
- What: autonomous rover with ultrasonic obstacle avoidance and Bluetooth control
- Hardware: Arduino-based, separate power rails for motor + logic to avoid brownouts
- Firmware: cooperative scheduler (no RTOS), state machine for behaviors
- File: projects/arduino-rover.md
- Repo: github.com/mohanlu/arduino-rover

## Achievements
- Dean's List, NYU Tandon (2025)
- 2nd place, Best Use of Hardware, HackNYU (2024)
- Tandon Scholarship recipient (2024)
- Valedictorian, National Honor Society (high school, 2023)
- AP Scholar with Distinction (2023)
- Top 10% Regional Math Olympiad (2022)

## Working style
- Direct, slightly playful, technically precise
- Bias toward shipping over polishing forever
- Reads code more than she writes it; cares about what the next person reads
- Likes: tools that make hard things feel obvious, durable architecture over demoable cleverness
- Avoids: marketing-speak, premature abstraction, frameworks that hide too much

═══════════════════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════════════════

- Keep responses under ~150 words unless the visitor asks for depth.
- Match Mohan's voice: direct, lowercase-friendly, technically precise,
  no marketing-speak. Use full sentences, but feel free to be casual.
- When you cite a file path, write it inline naturally — "she has more
  on this in projects/flareo.md" — not as a separate "Sources:" block.
- Never use exclamation points more than one per response.
- Never use phrases like "I'd love to", "happy to share", or other
  customer-service tics. Speak like a knowledgeable colleague.
- If you're hedging because something isn't in FACTS, say so directly:
  "That isn't covered in what I have on her — email is fastest."
`;



export default function CursorIDEPortfolio() {
  // Loading screen state — driven by the LoadingScreen component itself
  // via onComplete callback (timing depends on randomized typing speed,
  // so fixed timers would either cut off the last line or linger too long
  // after it finishes). Sequence:
  //   1. LoadingScreen mounts, types its sequence over ~3-4s
  //   2. On final command typed, calls `onComplete` -> we set fadingOut
  //   3. After fade-out (500ms), we set loadingDone -> overlay unmounts
  // The IDE renders behind the overlay the entire time so the fade reveals
  // ready content rather than a blank flash.
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const handleLoadingComplete = useCallback(() => {
    setLoadingFadeOut(true);
    setTimeout(() => setLoadingDone(true), 350);
  }, []);

  // Resizable panels
  const [filePanelWidth, onResizeFile] = useResize(232, { min: 160, max: 480, axis: 'x' });
  const [chatPanelWidth, onResizeChat] = useResize(320, { min: 240, max: 560, axis: 'x', invert: true });
  const [terminalHeight, onResizeTerm] = useResize(220, { min: 80,  max: 600, axis: 'y', invert: true });

  // Collapsed states
  const [fileCollapsed, setFileCollapsed] = useState(false);
  // Which view the activity bar is showing in the left panel
  const [leftPanel, setLeftPanel] = useState('files'); // 'files' | 'search' | 'activity' | 'stack' | 'achievements' | 'timeline' | 'contact'
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [termCollapsed, setTermCollapsed] = useState(false);

  // Tabs
  const [openTabs, setOpenTabs] = useState([
    { name: 'README.md', path: 'README.md', icon: 'md' },
  ]);
  const [activePath, setActivePath] = useState('README.md');
  const editorTabsScrollRef = useRef(null);
  const editorActiveTabRef = useRef(null);
  const termTabsScrollRef = useRef(null);
  const termActiveTabRef = useRef(null);

  // Auto-scroll active tabs into view (so they're never clipped at the right edge)
  useEffect(() => {
    if (editorActiveTabRef.current) {
      editorActiveTabRef.current.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [activePath]);
  useEffect(() => {
    // For the terminal, Terminal tab is always active in this mockup; scroll into view on mount/resize
    if (termActiveTabRef.current) {
      termActiveTabRef.current.scrollIntoView({ block: 'nearest', inline: 'end' });
    }
  }, []);

  const openFile = useCallback((item) => {
    setOpenTabs((tabs) => {
      if (tabs.find(t => t.path === item.path)) return tabs;
      return [...tabs, { name: item.name, path: item.path, icon: item.icon }];
    });
    setActivePath(item.path);
    setOutputLog((log) => [
      ...log,
      { ts: new Date(), level: 'info', source: 'editor', text: `opened ${item.path}` },
    ]);
  }, []);

  const closeTab = useCallback((path, e) => {
    e.stopPropagation();
    setOpenTabs((tabs) => {
      const idx = tabs.findIndex(t => t.path === path);
      const next = tabs.filter(t => t.path !== path);
      setActivePath((cur) => {
        if (cur !== path) return cur;
        if (next.length === 0) return null;
        return next[Math.max(0, idx - 1)].path;
      });
      return next;
    });
    setOutputLog((log) => [
      ...log,
      { ts: new Date(), level: 'info', source: 'editor', text: `closed ${path}` },
    ]);
  }, []);

  // ── Bottom panel state, which tab is active (Terminal | Output | Ports) ──
  // VS Code-style tabs at the bottom. Each tab is a real surface, not chrome.
  const [bottomTab, setBottomTab] = useState('terminal');
  const [outputLog, setOutputLog] = useState(() => [
    { ts: new Date(), level: 'info', source: 'system', text: 'site loaded · all systems green' },
    { ts: new Date(), level: 'info', source: 'system', text: 'opening README.md (default)' },
  ]);
  // Helper to append to the activity log from anywhere in the component
  const pushOutput = useCallback((source, text, level = 'info') => {
    setOutputLog((log) => [...log, { ts: new Date(), level, source, text }]);
  }, []);

  // ── Visitor info (synchronously detectable) ───────────────────────────
  // Detects browser, OS, locale, and timezone from the user agent + Intl.
  // This is what every website can already see, surfacing it here is a
  // playful "I notice you exist" moment that fits the dev-tool aesthetic.
  // The IP is fetched async (see below) since it requires a network call.
  // Visitor detection — populated in useEffect after mount. Computing
  // these values inline at render-time produces SSR/client mismatch
  // (server has no navigator, client does). Keeping it as state means
  // SSR and the first hydration pass both see `null`, then a re-render
  // populates real values without diff complaints.
  const [visitorInfo, setVisitorInfo] = useState(null);
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent;
    let os = 'Unknown';
    if (/Mac/.test(ua))          os = 'macOS';
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/Linux/.test(ua))   os = 'Linux';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    let browser = 'Unknown';
    if (/Edg\//.test(ua))            browser = 'Edge';
    else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
    else if (/Chrome\//.test(ua))    browser = 'Chrome';
    else if (/Safari/.test(ua))      browser = 'Safari';
    else if (/Firefox/.test(ua))     browser = 'Firefox';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const lang = navigator.language || 'en-US';
    setVisitorInfo({ os, browser, tz, lang });
  }, []);

  // IP gets resolved asynchronously from a CORS-friendly free service.
  // Tries multiple endpoints in case one is blocked by adblocker/CSP.
  // Stored in component state, also used by the `whois` command.
  const [visitorIp, setVisitorIp] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const endpoints = [
      { url: 'https://api.ipify.org?format=json',     parse: (d) => d.ip },
      { url: 'https://api64.ipify.org?format=json',   parse: (d) => d.ip },
      { url: 'https://ipapi.co/json/',                parse: (d) => d.ip },
    ];
    (async () => {
      for (const { url, parse } of endpoints) {
        try {
          const r = await fetch(url);
          if (!r.ok) continue;
          const data = await r.json();
          const ip = parse(data);
          if (ip && !cancelled) {
            setVisitorIp(ip);
            return;
          }
        } catch {
          // Try next endpoint
        }
      }
      // All endpoints failed (CSP, adblocker, offline). Fall back to a
      // playful placeholder so the slot still renders rather than being empty.
      if (!cancelled) setVisitorIp('hidden');
    })();
    return () => { cancelled = true; };
  }, []);

  // Terminal initial lines — populated after mount in a useEffect that
  // depends on visitorInfo. Initial state is empty so SSR and first
  // hydration render identical empty terminals; the welcome banner
  // appears once the client has detected browser / OS / timezone.
  const [termLines, setTermLines] = useState([]);
  useEffect(() => {
    // Wait until visitor detection has populated; otherwise the banner
    // would say "detected Unknown on Unknown" then flash to the real
    // values, which looks broken.
    if (!visitorInfo) return;
    const lines = [];
    // ASCII banner (figlet "standard" font), drops in like a shell MOTD
    const banner = [
      ' __  __  ___  _   _    _    _   _   _    _   _ ',
      '|  \\/  |/ _ \\| | | |  / \\  | \\ | | | |  | | | |',
      '| |\\/| | | | | |_| | / _ \\ |  \\| | | |  | | | |',
      '| |  | | |_| |  _  |/ ___ \\| |\\  | | |__| |_| |',
      '|_|  |_|\\___/|_| |_/_/   \\_\\_| \\_| |_____\\___/ ',
    ];
    for (const l of banner) lines.push({ kind: 'banner', text: l });
    lines.push({ kind: 'banner', text: '' });

    const loginTime = new Date().toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });
    lines.push({ kind: 'system', text: `Last login: ${loginTime} on ttys001` });
    lines.push({ kind: 'comment', text: `# detected ${visitorInfo.browser} on ${visitorInfo.os} · ${visitorInfo.tz}` });
    lines.push({ kind: 'comment', text: '# type `whois` to see what I see, or `help` for the full command list' });
    setTermLines(lines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorInfo]);
  const [termInput, setTermInput] = useState('');
  const [cmdHist, setCmdHist] = useState([]);
  const [cmdHistIdx, setCmdHistIdx] = useState(-1);
  // Virtual current working directory for `cd` / `pwd`. Empty string = root.
  const [termCwd, setTermCwd] = useState('');
  // Page load timestamp for `uptime` command. Set once on mount.
  const pageLoadedAt = useRef(Date.now());
  const termInputRef = useRef(null);
  const termScrollRef = useRef(null);

  useEffect(() => {
    if (termScrollRef.current) termScrollRef.current.scrollTop = termScrollRef.current.scrollHeight;
  }, [termLines]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    const echo = { kind: 'prompt', text: raw };
    if (!cmd) { setTermLines((l) => [...l, echo]); return; }

    setCmdHist((h) => [...h, cmd]);
    setCmdHistIdx(-1);
    pushOutput('terminal', `$ ${cmd}`);

    // Support compound commands like `git status` by checking the first
    // two tokens before falling through to single-name handlers.
    const tokens = cmd.split(/\s+/);
    const [name, ...args] = tokens;
    const compound = tokens.length >= 2 ? `${tokens[0]} ${tokens[1]}` : null;

    const out = (text, color) => ({ kind: 'output', text, color });
    const cmt = (text) => ({ kind: 'comment', text });

    // Resolve a path argument relative to the current cwd. Supports ~, /,
    // .., and bare folder/file names. Returns canonical path used as key
    // in `tree` / `FILE_CONTENT`.
    const resolvePath = (input) => {
      if (!input || input === '~' || input === '/') return '';
      if (input.startsWith('/')) return input.slice(1);
      if (input === '..') {
        const parts = termCwd.split('/').filter(Boolean);
        parts.pop();
        return parts.join('/');
      }
      return termCwd ? `${termCwd}/${input}` : input;
    };

    // Walk the tree and resolve a folder-path to its children, or null.
    const resolveFolder = (path) => {
      if (!path) return tree;
      const parts = path.split('/').filter(Boolean);
      let level = tree;
      for (const part of parts) {
        const node = level.find(n => n.type === 'folder' && n.name === part);
        if (!node) return null;
        level = node.children;
      }
      return level;
    };

    // Flatten the tree to all file paths (used by `find` and `tree` count).
    const allFiles = (() => {
      const acc = [];
      const walk = (nodes, prefix = '') => {
        for (const n of nodes) {
          const p = prefix ? `${prefix}/${n.name}` : n.name;
          if (n.type === 'folder') walk(n.children, p);
          else acc.push(p);
        }
      };
      walk(tree);
      return acc;
    })();

    let result = [];

    // Standard navigation -------------------------------------------------
    if (name === 'help') {
      result = [
        out('Type any command. Full reference in commands.md.'),
        out(''),
        out('navigation:  pwd  cd  ls  tree  find', C.textSecondary),
        out('files:       cat  open  head  tail  grep  wc',  C.textSecondary),
        out('info:        whoami  whois  date  uptime  uname  history', C.textSecondary),
        out('utility:     echo  which  man  clear  theme', C.textSecondary),
        out('fun:         coffee  cowsay  fortune  matrix  42  hire  stars  sl', C.textSecondary),
        out(''),
        cmt('# tip: open commands.md in the file tree for the full list'),
      ];
    }
    else if (name === 'pwd') {
      result = [out('/Users/visitor/mohan-lu' + (termCwd ? '/' + termCwd : ''))];
    }
    else if (name === 'cd') {
      const target = args[0];
      if (!target || target === '~' || target === '/') { setTermCwd(''); result = []; }
      else if (target === '..') {
        setTermCwd((c) => {
          const parts = c.split('/').filter(Boolean);
          parts.pop();
          return parts.join('/');
        });
        result = [];
      } else {
        const resolved = resolvePath(target);
        if (resolveFolder(resolved)) { setTermCwd(resolved); result = []; }
        else result = [out('cd: ' + target + ': no such directory', C.err)];
      }
    }
    else if (name === 'ls') {
      const target = args[0] ? resolvePath(args[0].replace(/\/$/, '')) : termCwd;
      const items = resolveFolder(target);
      if (!items) result = [out('ls: ' + (args[0] || '.') + ': no such directory', C.err)];
      else result = items.map(it => out(
        it.type === 'folder' ? it.name + '/' : it.name,
        it.type === 'folder' ? C.synFn : C.textPrimary
      ));
    }
    else if (name === 'tree') {
      const lines = [out('mohan-lu', C.synFn)];
      const walk = (nodes, prefix) => {
        nodes.forEach((n, i) => {
          const isLast = i === nodes.length - 1;
          const branch = isLast ? '└── ' : '├── ';
          const color = n.type === 'folder' ? C.synFn : C.textPrimary;
          lines.push(out(prefix + branch + (n.type === 'folder' ? n.name + '/' : n.name), color));
          if (n.type === 'folder') walk(n.children, prefix + (isLast ? '    ' : '│   '));
        });
      };
      walk(tree, '');
      lines.push(cmt(`# ${allFiles.length} files`));
      result = lines;
    }
    else if (name === 'find') {
      const query = args[0];
      if (!query) result = [out('find: missing argument. usage: find <name>', C.err)];
      else {
        const matches = allFiles.filter(f => f.toLowerCase().includes(query.toLowerCase()));
        result = matches.length
          ? matches.map(f => out('./' + f))
          : [out('find: no matches for "' + query + '"', C.textMuted)];
      }
    }
    // File reading -------------------------------------------------------
    else if (name === 'cat' || name === 'open' || name === 'head' || name === 'tail') {
      const path = args[0] && resolvePath(args[0]);
      if (!path) result = [out(name + ': missing argument', C.err)];
      else if (!FILE_CONTENT[path]) result = [out(name + ': ' + args[0] + ': no such file', C.err)];
      else {
        openFile({ name: path.split('/').pop(), path, icon: fileKindFromPath(path) });
        result = [out('opened ' + path, C.synKeyword)];
      }
    }
    else if (name === 'grep') {
      const [pattern, file] = args;
      if (!pattern || !file) result = [out('grep: usage: grep <pattern> <file>', C.err)];
      else {
        const path = resolvePath(file);
        const f = FILE_CONTENT[path];
        if (!f) result = [out('grep: ' + file + ': no such file', C.err)];
        else if (f.kind === 'json' || f.kind === 'pdf') result = [out('grep: ' + file + ': binary or non-text file', C.err)];
        else {
          const body = typeof f.body === 'string' ? f.body : JSON.stringify(f.body, null, 2);
          const compiled = compileSafeRegex(pattern, 'i');
          if (compiled.error) {
            result = [out('grep: ' + compiled.error + ': ' + pattern, C.err)];
          } else {
            const lines = body.split('\n');
            const { matches, partial } = safeRegexFilter(compiled.re, lines, (line) => line);
            if (matches.length === 0) {
              result = [out('grep: no matches for "' + pattern + '" in ' + file, C.textMuted)];
            } else {
              result = matches.slice(0, 20).map(l => out(l.trim()));
              if (partial) result.push(cmt('# pattern aborted (took too long); showing partial results'));
            }
          }
        }
      }
    }
    else if (name === 'wc') {
      const path = args[0] && resolvePath(args[0]);
      if (!path) result = [out('wc: missing argument', C.err)];
      else if (!FILE_CONTENT[path]) result = [out('wc: ' + args[0] + ': no such file', C.err)];
      else {
        const f = FILE_CONTENT[path];
        const body = typeof f.body === 'string' ? f.body : JSON.stringify(f.body, null, 2);
        const lc = body.split('\n').length;
        const wcc = body.split(/\s+/).filter(Boolean).length;
        const cc = body.length;
        result = [out(`${lc.toString().padStart(7)} ${wcc.toString().padStart(7)} ${cc.toString().padStart(7)} ${args[0]}`)];
      }
    }
    // Info ---------------------------------------------------------------
    else if (name === 'whoami') {
      result = [out('mohan lu, undergrad @ nyu tandon, full-stack engineer')];
    }
    else if (name === 'whois') {
      const lines = [];
      lines.push(out('// What I can see about you from your browser:'));
      if (visitorInfo) {
        lines.push(out(`  os         ${visitorInfo.os}`,      C.textPrimary));
        lines.push(out(`  browser    ${visitorInfo.browser}`, C.textPrimary));
        lines.push(out(`  timezone   ${visitorInfo.tz}`,      C.textPrimary));
        lines.push(out(`  locale     ${visitorInfo.lang}`,    C.textPrimary));
      }
      lines.push(out(`  ip         ${visitorIp || 'resolving...'}`, visitorIp ? C.textPrimary : C.textMuted));
      lines.push(cmt('# this is what every site sees, I just show it to you. nothing is logged.'));
      result = lines;
    }
    else if (name === 'date') {
      result = [out(new Date().toString())];
    }
    else if (name === 'uptime') {
      const ms = Date.now() - pageLoadedAt.current;
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      const parts = [];
      if (h) parts.push(`${h}h`);
      if (m % 60) parts.push(`${m % 60}m`);
      parts.push(`${s % 60}s`);
      result = [out(`up ${parts.join(' ')}, 1 visitor, load average: 0.42, 0.42, 0.42`)];
    }
    else if (name === 'uname') {
      if (args[0] === '-a') result = [out('Mohanland 4.2.0-portfolio #1 SMP Sun Apr 26 2026 x86_64 ' + (visitorInfo?.os || 'Unknown') + ' GNU/Linux')];
      else                  result = [out('Mohanland')];
    }
    else if (name === 'history') {
      result = cmdHist.length
        ? cmdHist.slice(-30).map((c, i) => out(`${(cmdHist.length - cmdHist.slice(-30).length + i + 1).toString().padStart(4)}  ${c}`))
        : [out('history is empty', C.textMuted)];
    }
    else if (name === 'echo') {
      result = [out(args.join(' '))];
    }
    else if (name === 'which') {
      const target = args[0];
      const known = ['help','pwd','cd','ls','tree','find','cat','open','head','tail','grep','wc','whoami','whois','date','uptime','uname','history','echo','which','man','clear','theme','coffee','cowsay','fortune','matrix','hire','stars','ping','sl','42','sudo','rm','mkdir','touch','vim','nano','emacs','exit','logout'];
      if (!target) result = [out('which: missing argument', C.err)];
      else if (known.includes(target)) result = [out(`/usr/local/bin/${target}`)];
      else                              result = [out(target + ' not found', C.err)];
    }
    else if (name === 'man') {
      const target = args[0];
      const manPages = {
        ls: 'ls — list directory contents. Usage: ls [folder]',
        cd: 'cd — change directory. Usage: cd <folder> | cd .. | cd ~',
        cat: 'cat — open a file in the editor. Usage: cat <file>',
        grep: 'grep — search for pattern in file. Usage: grep <pattern> <file>',
        whois: 'whois — show what your browser exposes about you',
        coffee: 'coffee — produce a hot beverage',
        sudo: 'sudo — execute a command as root. results may vary.',
        hire: 'hire — open the contact panel. for serious offers only.',
      };
      if (!target) result = [out('man: what manual page do you want?', C.err)];
      else if (manPages[target]) result = [out(manPages[target])];
      else                       result = [out('No manual entry for ' + target, C.err)];
    }
    else if (name === 'clear') { setTermLines([]); return; }
    else if (name === 'theme') {
      result = [out('theme set to: ' + (args[0] || 'anysphere-dark') + ' (mock)', C.synKeyword)];
    }
    // Fun side -----------------------------------------------------------
    else if (name === 'coffee') {
      result = [
        out('      ( ('),
        out('       ) )'),
        out('    ........'),
        out('    |      |]', C.synFn),
        out('    \\      /', C.synFn),
        out("     `----'", C.synFn),
        cmt('# the most important command'),
      ];
    }
    else if (name === 'cowsay') {
      const text = args.join(' ') || 'moo';
      const bar = '-'.repeat(text.length + 2);
      result = [
        out(' ' + bar),
        out(`< ${text} >`),
        out(' ' + bar),
        out('        \\   ^__^'),
        out('         \\  (oo)\\_______'),
        out('            (__)\\       )\\/\\'),
        out('                ||----w |'),
        out('                ||     ||'),
      ];
    }
    else if (name === 'fortune') {
      const fortunes = [
        '"Premature optimization is the root of all evil."  — Donald Knuth',
        '"Talk is cheap. Show me the code."  — Linus Torvalds',
        '"Simplicity is prerequisite for reliability."  — Edsger Dijkstra',
        '"The best error message is the one that never shows up."  — Thomas Fuchs',
        '"It compiles! Ship it."  — every developer at 4:59pm Friday',
        '"There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors."',
        '"Code is read more often than it is written."  — Guido van Rossum',
        '"Make it work, make it right, make it fast — in that order."  — Kent Beck',
      ];
      result = [out(fortunes[Math.floor(Math.random() * fortunes.length)], C.synString)];
    }
    else if (name === 'matrix') {
      result = [
        out('Wake up, Neo...', C.synKeyword),
        out('The Matrix has you...', C.synKeyword),
        out('Follow the white rabbit.', C.synKeyword),
        cmt('# (full matrix rain coming in v3)'),
      ];
    }
    else if (name === '42') {
      result = [
        out('The answer to the ultimate question of life, the universe, and everything.', C.synFn),
        cmt('# Douglas Adams was right'),
      ];
    }
    else if (name === 'hire') {
      setLeftPanel('contact');
      result = [
        out('opening contact panel...', C.synKeyword),
        out('thanks for considering. fastest path: email or linkedin in the side panel.', C.textPrimary),
      ];
    }
    else if (name === 'stars') {
      result = [
        out('check the GitHub heatmap on the left panel.', C.synKeyword),
        cmt('# all green squares are commits, hover for details'),
      ];
    }
    else if (name === 'ping') {
      const host = args[0] || 'localhost';
      result = [
        out(`PING ${host}: 56 data bytes`),
        out(`64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.420 ms`, C.textPrimary),
        out(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.380 ms`, C.textPrimary),
        out(`--- ${host} ping statistics ---`),
        out('2 packets transmitted, 2 received, 0% packet loss', C.synKeyword),
      ];
    }
    else if (name === 'sl') {
      result = [
        out('      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @', C.synFn),
        out('     (@@@@)', C.synFn),
        out('  (    )', C.synFn),
        out('====        ________                ___________', C.synKeyword),
        out('_D _|  |_______/        \\__I_I_____===__|_________|', C.synKeyword),
        out(' |(_)---  |   H\\________/ |   |        =|___ ___|', C.synKeyword),
        out(' /     |  |   H  |  |     |   |         ||_| |_||', C.synKeyword),
        cmt('# you typed sl. you meant ls. happens to the best of us.'),
      ];
    }
    // Meta / jokes -------------------------------------------------------
    else if (name === 'sudo') {
      result = [
        out(args.length ? `[sudo] password for visitor: ` : 'usage: sudo <command>'),
        out('Sorry, visitor is not in the sudoers file. This incident will be reported.', C.err),
        cmt('# (just kidding, nothing is reported, this is a portfolio)'),
      ];
    }
    else if (name === 'rm') {
      result = [
        out('rm: nice try.', C.err),
        out('this is a portfolio. files cannot be deleted.', C.textPrimary),
        cmt('# but I appreciate the destructive energy'),
      ];
    }
    else if (name === 'mkdir' || name === 'touch') {
      result = [
        out(`${name}: this is a static portfolio, but I admire the optimism.`, C.warn),
        cmt(`# try the real ${name} in your own terminal`),
      ];
    }
    else if (name === 'vim' || name === 'nano' || name === 'emacs') {
      const editorJokes = {
        vim:   "you've entered vim. there's no escape. (just kidding: :q)",
        nano:  'nano: a perfectly fine editor. nothing wrong with it.',
        emacs: 'emacs is not just an editor, it is a way of life.',
      };
      result = [out(editorJokes[name], C.synFn)];
    }
    else if (compound === 'git status') {
      result = [
        out('On branch main', C.synKeyword),
        out('Your branch is up to date with origin/main.'),
        out(''),
        out('nothing to commit, working tree clean', C.synKeyword),
      ];
    }
    else if (compound === 'git log') {
      result = [
        out('commit a1b2c3d (HEAD -> main, origin/main)', C.warn),
        out('Author: Mohan Lu <mohan@example.com>'),
        out('Date:   Sun Apr 26 2026'),
        out(''),
        out('    portfolio v2: shipped'),
        cmt('# more in the activity panel on the left'),
      ];
    }
    else if (compound === 'npm install' || compound === 'npm i') {
      result = [
        out('installing vibes...', C.textMuted),
        out('vibes installed. 0 vulnerabilities.', C.synKeyword),
        cmt('# 0 packages added (this is a static site, no real npm here)'),
      ];
    }
    else if (compound === 'npm run dev' || compound === 'npm start') {
      result = [
        out('> dev', C.textMuted),
        out('> next dev', C.textMuted),
        out(''),
        out('  > Next.js 14.0.0', C.synFn),
        out('  - Local:        http://localhost:3000', C.textPrimary),
        out(''),
        out(' Ready in 420ms', C.synKeyword),
        cmt('# (this is a mock — you are already on the site)'),
      ];
    }
    else if (name === 'exit' || name === 'logout' || name === 'quit') {
      result = [
        out("there's no escape. you're committed to the bit.", C.synFn),
        cmt('# close the tab if you really must'),
      ];
    }
    // Fallback -----------------------------------------------------------
    else {
      const allCmds = ['help','pwd','cd','ls','tree','find','cat','open','head','tail','grep','wc','whoami','whois','date','uptime','uname','history','echo','which','man','clear','theme','coffee','cowsay','fortune','matrix','hire','stars','ping','sl','42','sudo','rm','mkdir','touch','vim','nano','emacs','exit','git','npm'];
      const closest = allCmds.find(c => c.startsWith(name) || name.startsWith(c));
      result = [
        out('command not found: ' + name, C.err),
        ...(closest ? [out(`did you mean: ${closest}?`, C.textMuted)] : []),
        cmt("# type 'help' or open commands.md"),
      ];
    }

    setTermLines((l) => [...l, echo, ...result]);
  };


  const onTermKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(termInput);
      setTermInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHist.length === 0) return;
      const idx = cmdHistIdx === -1 ? cmdHist.length - 1 : Math.max(0, cmdHistIdx - 1);
      setCmdHistIdx(idx);
      setTermInput(cmdHist[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistIdx === -1) return;
      const idx = cmdHistIdx + 1;
      if (idx >= cmdHist.length) { setCmdHistIdx(-1); setTermInput(''); }
      else { setCmdHistIdx(idx); setTermInput(cmdHist[idx]); }
    }
  };

  // Chat
  const [chatMsgs, setChatMsgs] = useState([
    { role: 'user', text: 'what kind of projects has Mohan built?' },
    { role: 'assistant', parts: [
      { type: 'text', text: "Mohan has shipped projects across full-stack web, embedded systems, and 3D, a few highlights:" },
      { type: 'cite', path: 'projects/flareo.md', label: 'projects/flareo.md', note: 'full-stack worker pipeline w/ Postgres + R2' },
      { type: 'text', text: "She's also worked on a particle-canvas web experiment and an Arduino rover. Want me to expand on any of these?" },
    ]},
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatThinking, setChatThinking] = useState(false); // shows "..." indicator while assistant prepares response
  const chatInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatMsgs, chatThinking]);

  // ── Handcrafted chatbot responses ──────────────────────────────────────
  // Keyword-based matcher for known questions. Each response is a `parts`
  // array (matching the assistant message format), can mix prose text with
  // citation chips that link to real files in the tree. Responses are
  // written in Mohan's voice as if the assistant has actually read her work.
  const chatResponses = [
    {
      keywords: ['backend', 'server', 'api', 'database'],
      parts: [
        { type: 'text', text: "Her strongest backend chops are in distributed pipelines and async job systems, Flareo is the clearest example. It runs on Cloudflare Workers with a Postgres metadata layer and R2 for blob storage." },
        { type: 'cite', path: 'projects/flareo.md', label: 'projects/flareo.md', note: 'job queue, retries, observability' },
        { type: 'text', text: "On the data side, she's worked with MySQL, MongoDB, and is comfortable designing schemas from scratch. Most of her backend is TypeScript or Python." },
      ],
      followUps: ['How is Flareo architected?', 'What about frontend?', 'Open to backend roles?'],
    },
    {
      keywords: ['skill', 'strongest', 'best at', 'good at'],
      parts: [
        { type: 'text', text: "If I had to pick one, translating fuzzy product ideas into shippable, reliable systems. She pairs strong fundamentals (algorithms, systems design) with full-stack execution." },
        { type: 'text', text: "Concretely: TypeScript, Python, React, and embedded C/C++ are where she's most fluent. She also reaches for Docker, Kubernetes, and Cloudflare Workers when shipping things." },
        { type: 'cite', path: 'skills/coming-soon.md', label: 'skills/coming-soon.md', note: 'full skills breakdown' },
      ],
      followUps: ['Show me a project', 'How does she pick a stack?', 'Which is she learning next?'],
    },
    {
      keywords: ['hire', 'why hire', 'should i hire', 'work with'],
      parts: [
        { type: 'text', text: "Three reasons that show up consistently in her work:" },
        { type: 'text', text: "1. Range, she ships frontend, backend, and embedded firmware with the same care. Most engineers pick one." },
        { type: 'text', text: "2. Taste, her projects look and feel intentional. She sweats UX details that don't strictly need to ship." },
        { type: 'text', text: "3. Velocity, a lot has shipped while still being a Tandon undergrad. The pace is real." },
        { type: 'cite', path: 'about/resume.pdf', label: 'about/resume.pdf', note: 'full resume' },
      ],
      followUps: ['What is she looking for?', 'When is she available?', 'How do I reach out?'],
    },
    {
      keywords: ['flareo', 'worker', 'cloudflare', 'pipeline'],
      parts: [
        { type: 'text', text: "Flareo is her full-stack worker pipeline, handles async job processing with Postgres for state, R2 for blobs, and Cloudflare Workers for compute. Built with retries, observability, and graceful degradation in mind." },
        { type: 'cite', path: 'projects/flareo.md', label: 'projects/flareo.md', note: 'architecture + tradeoffs' },
      ],
      followUps: ['Why Cloudflare Workers?', 'Is it open source?', 'What scale does it handle?'],
    },
    {
      keywords: ['arduino', 'rover', 'embedded', 'hardware', 'robot'],
      parts: [
        { type: 'text', text: "The Arduino rover was a hardware project, autonomous navigation with ultrasonic obstacle avoidance and remote control over Bluetooth. Wrote the firmware in C++ and the companion app for piloting it." },
        { type: 'cite', path: 'projects/arduino-rover.md', label: 'projects/arduino-rover.md', note: 'hardware + firmware notes' },
      ],
      followUps: ['What sensors did she use?', 'Other hardware projects?', 'Does she know ROS?'],
    },
    {
      keywords: ['particle', 'canvas', 'visual', 'animation', 'web experiment'],
      parts: [
        { type: 'text', text: "The particle-canvas project explores interactive WebGL, a system where particles connect into constellations and respond to mouse movement. It's the same vibe behind the loading screen on this site, actually." },
        { type: 'cite', path: 'projects/particle-canvas.md', label: 'projects/particle-canvas.md', note: 'interactive web canvas' },
      ],
      followUps: ['Other creative projects?', 'WebGL or Three.js?', 'What does she design with?'],
    },
    {
      keywords: ['contact', 'reach', 'email', 'get in touch'],
      parts: [
        { type: 'text', text: "Best ways to reach her are email or LinkedIn. There's also a 15-min booking link if you'd rather chat live." },
        { type: 'cite', path: 'contact.json', label: 'contact.json', note: 'email + socials' },
      ],
      followUps: ['Is she open to internships?', 'When is she available?', 'What is she looking for?'],
    },
    {
      keywords: ['education', 'school', 'university', 'nyu', 'tandon', 'degree'],
      parts: [
        { type: 'text', text: "She's an undergrad at NYU Tandon studying computer science. The full timeline of milestones is in the about folder." },
        { type: 'cite', path: 'about/timeline.json', label: 'about/timeline.json', note: 'education + milestones' },
      ],
      followUps: ['When does she graduate?', 'What is she focused on?', 'Any hackathon wins?'],
    },
    {
      keywords: ['who is', 'about her', 'who are you', 'who is mohan', 'tell me about'],
      parts: [
        { type: 'text', text: "Mohan Lu, full-stack engineer, NYU Tandon undergrad. Builds across web, embedded, and 3D. Bias toward shipping." },
        { type: 'cite', path: 'about/bio.sh', label: 'about/bio.sh', note: 'her bio' },
      ],
      followUps: ['What has she built?', 'What are her strongest skills?', 'Why hire her?'],
    },
    {
      keywords: ['project', 'projects', 'what has she built', 'work', 'portfolio'],
      parts: [
        { type: 'text', text: "Three featured projects right now, Flareo (the full-stack worker pipeline), an interactive particle-canvas web experiment, and an autonomous Arduino rover. There's a folder for each:" },
        { type: 'cite', path: 'projects/flareo.md', label: 'projects/flareo.md', note: 'distributed job pipeline' },
        { type: 'cite', path: 'projects/particle-canvas.md', label: 'projects/particle-canvas.md', note: 'WebGL constellation' },
        { type: 'cite', path: 'projects/arduino-rover.md', label: 'projects/arduino-rover.md', note: 'embedded + autonomous nav' },
      ],
      followUps: ['Tell me about Flareo', 'Tell me about the rover', "What's particle-canvas?"],
    },
  ];

  // Default fallback when no keyword matches, varied so it doesn't feel canned
  const chatFallbacks = [
    [
      { type: 'text', text: "I don't have a confident answer for that yet, this assistant is still being trained on Mohan's full body of work. In the meantime, the file tree on the left has most of what's been written so far." },
      { type: 'cite', path: 'README.md', label: 'README.md', note: 'where to start' },
    ],
    [
      { type: 'text', text: "Good question, I haven't seen that one come up before. Try asking me about her projects, her strongest skills, or why you should hire her. Or browse the file tree on the left." },
    ],
    [
      { type: 'text', text: "I'm not sure about that one specifically, but here's what I can point you toward: her bio, her project notes, and her resume." },
      { type: 'cite', path: 'about/bio.sh', label: 'about/bio.sh', note: null },
      { type: 'cite', path: 'about/resume.pdf', label: 'about/resume.pdf', note: null },
    ],
  ];

  // Default fallback follow-ups when no keyword matches
  const fallbackFollowUps = [
    'What has she built?',
    'What are her strongest skills?',
    'How do I reach out?',
  ];

  // ──────────────────────────────────────────────────────────────────────
  //   CHAT CONFIG, flip useRealLLM to true once the /api/chat endpoint
  //   is deployed.
  //
  //   To wire up a real LLM:
  //     1. Deploy this site to Vercel as a Next.js project
  //     2. Create a serverless route at app/api/chat/route.ts that:
  //          - reads { messages, system } from the POST body
  //          - calls the Anthropic SDK with messages.stream()
  //          - forwards each text_delta event to the browser as
  //            an SSE chunk shaped like { text: "..." }
  //          - sends 'data: [DONE]' when finished
  //          - returns Response with Content-Type: text/event-stream
  //     3. Set env var ANTHROPIC_API_KEY in the Vercel dashboard
  //     4. Add @upstash/ratelimit for IP-based rate limiting
  //     5. Cache common prompts via Vercel KV (sha256 the prompt text)
  //     6. Flip useRealLLM below to true and redeploy
  //
  //   The frontend never sees the API key, all calls go through your
  //   serverless route, which reads the key from env vars. The fetch()
  //   call in liveChatProvider hits /api/chat (your route), never the
  //   provider's API directly.
  // ──────────────────────────────────────────────────────────────────────
  const CHAT_CONFIG = {
    useRealLLM: false,                      // flip to true after deploy
    apiEndpoint: '/api/chat',               // Vercel serverless route
    model: 'claude-sonnet-4-5',
    systemPrompt: SYSTEM_PROMPT_ABOUT_MOHAN, // defined below the component
  };

  // Pick a response for an incoming prompt: keyword match first, fallback otherwise
  // Returns { parts, followUps } so we can show contextual suggestions afterward.
  // Used only in mock mode, when useRealLLM is true, this is bypassed entirely.
  const matchResponse = (text) => {
    const lower = text.toLowerCase();
    for (const r of chatResponses) {
      if (r.keywords.some((kw) => lower.includes(kw))) {
        return { parts: r.parts, followUps: r.followUps || [] };
      }
    }
    return {
      parts: chatFallbacks[Math.floor(Math.random() * chatFallbacks.length)],
      followUps: fallbackFollowUps,
    };
  };

  // ─── Streaming providers ──────────────────────────────────────────────
  // Both providers share the same async-iterator contract:
  //   yields { type: 'text', text: string }      , partial text chunks
  //   yields { type: 'cite', path, label, note } , citation cards
  //   yields { type: 'done', followUps: [] }     , end-of-stream signal
  //
  // The renderer (streamAssistantReply) is provider-agnostic. Swapping
  // mock → live is just a config flip; no UI code changes.

  // Mock provider, simulates a real LLM with character-by-character typing
  // for development / when no API key is configured. Returns an async iter.
  async function* mockChatProvider(userText) {
    const { parts, followUps } = matchResponse(userText);

    // Brief "thinking" delay before first token
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));

    for (const part of parts) {
      if (part.type === 'cite') {
        await new Promise((r) => setTimeout(r, 220));
        yield { type: 'cite', path: part.path, label: part.label, note: part.note };
      } else if (part.type === 'text') {
        // Stream characters in chunks of 1-3 for natural typing rhythm
        let i = 0;
        while (i < part.text.length) {
          const chunkSize = 1 + Math.floor(Math.random() * 3);
          const chunk = part.text.slice(i, i + chunkSize);
          i += chunkSize;
          // Occasional longer pause to simulate "thinking mid-sentence"
          const delay = Math.random() < 0.04 ? 80 : 16 + Math.random() * 18;
          await new Promise((r) => setTimeout(r, delay));
          yield { type: 'text', text: chunk };
        }
        // Pause between text blocks
        await new Promise((r) => setTimeout(r, 180));
      }
    }
    yield { type: 'done', followUps };
  }

  // Live provider, calls /api/chat on Vercel. Reads SSE chunks from the
  // server-streamed response. Auto-falls back to mock provider on failure.
  async function* liveChatProvider(userText, conversationHistory) {
    try {
      // Convert frontend message shape to the API's history format. Only
      // text content is sent — citations and follow-ups are frontend-only
      // structures. The route caps history at 20 messages server-side.
      const history = conversationHistory.map((m) => ({
        role: m.role,
        content: m.role === 'user'
          ? m.text
          : (m.parts || []).filter((p) => p.type === 'text').map((p) => p.text).join('\n\n'),
      })).filter((m) => m.content && m.content.trim().length > 0);

      const response = await fetch(CHAT_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history,
          systemPrompt: CHAT_CONFIG.systemPrompt,
        }),
      });

      // Specific handling for rate limits — show a friendly message with
      // reset time instead of a generic error.
      if (response.status === 429) {
        const resetAt = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10) * 1000;
        const minsLeft = resetAt > Date.now() ? Math.ceil((resetAt - Date.now()) / 60000) : 60;
        yield { type: 'text', text: `That's a lot of questions! The chat is rate-limited (anti-abuse). Try again in ${minsLeft} min, or ` };
        yield { type: 'cite', path: 'contact.json', label: 'contact.json', note: 'reach out directly' };
        yield { type: 'done', followUps: [] };
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      // Parse SSE stream. Each event is `data: {json}\n\n`. The route
      // emits {type:'text',text} for content and {type:'done'} at end.
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const event of events) {
          const dataLine = event.split('\n').find((l) => l.startsWith('data: '));
          if (!dataLine) continue;
          const payload = dataLine.slice(6);
          try {
            const parsed = JSON.parse(payload);
            if (parsed.type === 'text' && parsed.text) {
              yield { type: 'text', text: parsed.text };
            } else if (parsed.type === 'error') {
              yield { type: 'text', text: ` (${parsed.error})` };
              yield { type: 'done', followUps: [] };
              return;
            } else if (parsed.type === 'done') {
              yield { type: 'done', followUps: [] };
              return;
            }
          } catch (e) {
            // Malformed SSE chunk, skip it but keep streaming
          }
        }
      }
      yield { type: 'done', followUps: [] };
    } catch (err) {
      yield { type: 'text', text: "Couldn't reach the server. Try again in a moment, or " };
      yield { type: 'cite', path: 'contact.json', label: 'contact.json', note: 'reach out directly' };
      yield { type: 'done', followUps: [] };
    }
  }

  // Pick the active provider based on config
  const getChatProvider = () =>
    CHAT_CONFIG.useRealLLM ? liveChatProvider : mockChatProvider;

  const sendChat = (text) => {
    if (!text.trim()) return;
    if (chatThinking) return; // wait for previous response to finish
    const userText = text.trim();
    const historySnapshot = chatMsgs;
    setChatMsgs((m) => [...m, { role: 'user', text: userText }]);
    setChatInput('');
    setSlashOpen(false);
    setChatThinking(true);
    // Truncate to ~50 chars in the log so it doesn't dominate the panel
    const preview = userText.length > 50 ? userText.slice(0, 47) + '...' : userText;
    pushOutput('chat', `→ ${preview}`);

    const provider = getChatProvider();
    streamAssistantReply(provider(userText, historySnapshot));
  };

  // Consume an async iterator of { type: 'text'|'cite'|'done' } chunks
  // and progressively append them to the latest assistant message. This
  // is provider-agnostic, both mock and live LLM yield the same shape.
  const streamAssistantReply = async (chunks) => {
    // Push an empty assistant message that will be progressively filled
    setChatMsgs((m) => [...m, { role: 'assistant', parts: [], streaming: true }]);
    setChatThinking(true);

    // Local mutable copy of "parts streamed so far"
    const streamed = [];
    let textBuffer = null; // current text part we're appending to

    // Helper to commit current state to React
    const commit = (partsOverride, extraFields = {}) => {
      setChatMsgs((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === 'assistant') {
          copy[copy.length - 1] = {
            ...last,
            parts: partsOverride || streamed.slice(),
            ...extraFields,
          };
        }
        return copy;
      });
    };

    let firstChunk = true;
    try {
      for await (const chunk of chunks) {
        // Drop the thinking indicator the moment the first real chunk arrives
        if (firstChunk) {
          setChatThinking(false);
          firstChunk = false;
        }

        if (chunk.type === 'text') {
          // Append to the running text part (or start a new one if last was a cite)
          if (textBuffer && streamed[streamed.length - 1] === textBuffer) {
            textBuffer.text += chunk.text;
          } else {
            textBuffer = { type: 'text', text: chunk.text };
            streamed.push(textBuffer);
          }
          commit();
        } else if (chunk.type === 'cite') {
          // Cites finalize the running text part (so next text starts fresh)
          textBuffer = null;
          streamed.push({
            type: 'cite',
            path: chunk.path,
            label: chunk.label || chunk.path,
            note: chunk.note,
          });
          commit();
        } else if (chunk.type === 'done') {
          // Final commit, flip streaming off, attach follow-ups
          commit(null, { streaming: false, followUps: chunk.followUps || [] });
          return;
        }
      }
      // Iterator ended without explicit done, still close cleanly
      commit(null, { streaming: false, followUps: [] });
    } catch (err) {
      console.error('streamAssistantReply error:', err);
      commit(null, { streaming: false, followUps: [] });
    } finally {
      setChatThinking(false);
    }
  };

  // Reset the chat to an empty conversation
  const newChat = () => {
    if (chatThinking) return;
    setChatMsgs([]);
    setChatInput('');
    setSlashOpen(false);
    setTimeout(() => chatInputRef.current?.focus(), 50);
  };

  // Regenerate an assistant message, find the user prompt that triggered it,
  // drop the assistant reply (and anything after), then re-run the prompt
  // through the active provider for a fresh response.
  const regenerateMessage = (assistantIdx) => {
    if (chatThinking) return;
    // Find the user message that came before this assistant message
    let userMsg = null;
    for (let i = assistantIdx - 1; i >= 0; i--) {
      if (chatMsgs[i].role === 'user') { userMsg = chatMsgs[i]; break; }
    }
    if (!userMsg) return;

    // Drop the assistant message we're regenerating (and anything after it)
    const truncatedHistory = chatMsgs.slice(0, assistantIdx - 1);
    setChatMsgs((m) => m.slice(0, assistantIdx));

    const provider = getChatProvider();
    streamAssistantReply(provider(userMsg.text, truncatedHistory));
  };

  // Slash command menu state (opens when input starts with "/")
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashIdx, setSlashIdx] = useState(0);
  // Copied indicator, keyed by message index
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Slash commands available in the input
  const slashCommands = [
    { cmd: '/projects',    desc: 'list all projects',      action: () => sendChat('show me her projects') },
    { cmd: '/skills',      desc: 'show stack summary',     action: () => sendChat('what are her strongest skills?') },
    { cmd: '/contact',     desc: 'show contact info',      action: () => sendChat('how do I reach out?') },
    { cmd: '/resume',      desc: 'open resume.pdf',        action: () => { openFile({ name: 'resume.pdf', path: 'about/resume.pdf', icon: 'pdf' }); setChatInput(''); setSlashOpen(false); } },
    { cmd: '/clear',       desc: 'clear conversation',     action: () => newChat() },
  ];

  // Filter commands by what's typed after "/"
  const filteredSlashCmds = slashCommands.filter(c =>
    c.cmd.toLowerCase().startsWith(chatInput.toLowerCase())
  );

  // Update slash menu visibility when input changes
  useEffect(() => {
    if (chatInput.startsWith('/') && filteredSlashCmds.length > 0) {
      setSlashOpen(true);
      setSlashIdx(0);
    } else {
      setSlashOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatInput]);

  // Handle copy on assistant message, extract plaintext from parts
  const copyAssistantMessage = (msg, idx) => {
    const text = (msg.parts || [])
      .filter(p => p.type === 'text')
      .map(p => p.text)
      .join('\n\n');
    try {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => c === idx ? null : c), 1600);
    } catch {}
  };

  const focusChat = () => {
    setChatCollapsed(false);
    setTimeout(() => chatInputRef.current?.focus(), 50);
  };

  const focusTerminal = () => {
    setTimeout(() => termInputRef.current?.focus(), 50);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === 'b' || e.key === 'B') { e.preventDefault(); setFileCollapsed(c => !c); }
      else if (e.key === 'j' || e.key === 'J') { e.preventDefault(); setTermCollapsed(c => !c); }
      else if (e.key === 'l' || e.key === 'L') { e.preventDefault(); setChatCollapsed(c => !c); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="w-screen h-screen" style={{ margin: 0, padding: 0 }}>

      {/* Loading overlay — covers everything until fade completes */}
      {!loadingDone && <LoadingScreen fadingOut={loadingFadeOut} onComplete={handleLoadingComplete} />}

      <div className="flex flex-col overflow-hidden ide-root"
           style={{ width: '100%', height: '100%', background: C.bgDeepest, fontFamily: 'Geist, system-ui, -apple-system, sans-serif', color: C.textPrimary }}>
        {/* TOP NAV BAR */}
        <div className="flex items-center px-4 flex-shrink-0"
             style={{ height: 38, borderBottom: `1px solid ${C.border}`, background: C.bgDeepest }}>
          {/* Wordmark with typewriter */}
          <TypewriterWordmark />

          <div className="flex-1" />

          {/* Right cluster, terminal-style commands */}
          <div className="flex items-center" style={{ gap: 18, fontSize: 12, color: C.textSecondary, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
            <NavCommand
              verb="cd"
              label="github"
              hoverAccent
              onClick={() => openFile({ name: 'github.md', path: 'github.md', icon: 'md' })}
            />
            <NavCommand
              verb="cd"
              label="linkedin"
              hoverAccent
              onClick={() => openFile({ name: 'linkedin.md', path: 'linkedin.md', icon: 'md' })}
            />
            <NavCommand
              verb="wget"
              label="resume"
              hoverAccent
              onClick={() => {
                window.alert('In the live site, this will download resume.pdf.');
              }}
            />
            {chatCollapsed && (
              <span
                onClick={() => setChatCollapsed(false)}
                className="cursor-pointer flex items-center gap-1"
                style={{ color: C.textPrimary }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.textPrimary; }}>
                <Sparkles size={11} strokeWidth={1.7} style={{ color: C.accent }} />
                ask mohan
              </span>
            )}
          </div>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-1 min-h-0">
          {/* ACTIVITY BAR */}
          <div className="flex flex-col items-center flex-shrink-0"
               style={{ width: 40, background: C.bgDeepest, borderRight: `1px solid ${C.border}` }}>
            <ActIcon Icon={Files}
              active={leftPanel === 'files' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'files') setFileCollapsed(c => !c);
                else { setLeftPanel('files'); setFileCollapsed(false); }
              }} />
            <ActIcon Icon={Search}
              active={leftPanel === 'search' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'search') setFileCollapsed(c => !c);
                else { setLeftPanel('search'); setFileCollapsed(false); }
              }} />
            <ActIcon Icon={GitBranch}
              active={leftPanel === 'activity' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'activity') setFileCollapsed(c => !c);
                else { setLeftPanel('activity'); setFileCollapsed(false); }
              }} />
            <ActIcon Icon={Package}
              active={leftPanel === 'stack' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'stack') setFileCollapsed(c => !c);
                else { setLeftPanel('stack'); setFileCollapsed(false); }
              }} />

            <ActIcon Icon={Award}
              active={leftPanel === 'achievements' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'achievements') setFileCollapsed(c => !c);
                else { setLeftPanel('achievements'); setFileCollapsed(false); }
              }} />
            <ActIcon Icon={Calendar}
              active={leftPanel === 'timeline' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'timeline') setFileCollapsed(c => !c);
                else { setLeftPanel('timeline'); setFileCollapsed(false); }
              }} />
            <ActIcon Icon={Mail}
              active={leftPanel === 'contact' && !fileCollapsed}
              onClick={() => {
                if (leftPanel === 'contact') setFileCollapsed(c => !c);
                else { setLeftPanel('contact'); setFileCollapsed(false); }
              }} />
          </div>

          {/* LEFT FILE PANEL */}
          {!fileCollapsed && (
            <>
              <div className="flex flex-col flex-shrink-0 overflow-hidden"
                   style={{ width: filePanelWidth, background: C.bgDeepest }}>
                {leftPanel === 'search' ? (
                  <SearchPanel onOpenFile={openFile} />
                ) : leftPanel === 'activity' ? (
                  <ActivityPanel onOpenFile={openFile} />
                ) : leftPanel === 'stack' ? (
                  <StackPanel onOpenFile={openFile} />
                ) : leftPanel === 'achievements' ? (
                  <AchievementsPanel onOpenFile={openFile} />
                ) : leftPanel === 'timeline' ? (
                  <TimelinePanel onOpenFile={openFile} />
                ) : leftPanel === 'contact' ? (
                  <ContactPanel onOpenFile={openFile} />
                ) : (
                  <>
                    <div className="flex items-center px-3 flex-shrink-0"
                         style={{ height: 30, fontSize: 11, color: C.textSecondary, letterSpacing: '0.05em' }}>
                      <span style={{ fontWeight: 600 }}>MOHAN-LU</span>
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {tree.map((item, i) => (
                        <TreeRow key={i} item={item} activePath={activePath} onOpenFile={openFile} />
                      ))}
                    </div>
                    <div className="relative" style={{ borderTop: `1px solid ${C.border}` }}>
                      <WanderingPet panelWidth={filePanelWidth} />
                      <GithubActivityHeatmap />
                    </div>
                  </>
                )}
              </div>
              <ResizeHandle onMouseDown={onResizeFile} axis="x" />
            </>
          )}

          {/* CENTER COLUMN */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden" style={{ background: C.bgEditor }}>
            {/* TAB BAR */}
            <div className="flex items-center" style={{ height: 30, background: C.bgDeepest, borderBottom: `1px solid ${C.border}` }}>
              <div ref={editorTabsScrollRef} className="flex items-center overflow-x-auto no-scrollbar flex-1 min-w-0">
                {openTabs.map((tab) => {
                  const isActive = tab.path === activePath;
                  return (
                    <div key={tab.path}
                         ref={isActive ? editorActiveTabRef : null}
                         onClick={() => setActivePath(tab.path)}
                         onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = C.textPrimary; }}
                         onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = C.textSecondary; }}
                         className="flex items-center gap-2 px-3 cursor-pointer relative"
                         style={{
                           height: 30,
                           background: isActive ? C.bgEditor : C.bgDeepest,
                           color: isActive ? C.textActive : C.textSecondary,
                           fontSize: 12,
                           fontFamily: 'Geist Mono, ui-monospace, monospace',
                           borderRight: `1px solid ${C.border}`,
                           whiteSpace: 'nowrap',
                           flexShrink: 0,
                           transition: 'color 100ms',
                         }}>
                      <FileIcon kind={tab.icon} />
                      <span>{tab.path.startsWith('virtual:') ? tab.name : tab.path}</span>
                      <X size={13} strokeWidth={1.5}
                         className="ml-2 hover:opacity-100"
                         style={{ color: C.textSecondary, opacity: 0.6 }}
                         onClick={(e) => closeTab(tab.path, e)} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BREADCRUMBS, like VS Code's path strip below the tabs.
                Shows repo › folder › file with chevron separators. */}
            {activePath && (
              <Breadcrumbs path={activePath} />
            )}

            {/* EDITOR BODY */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <EditorContent path={activePath} onOpenFile={openFile} onFocusChat={focusChat} onFocusTerminal={focusTerminal} />
            </div>

            {/* BOTTOM PANEL, Terminal + Output + Ports */}
            {!termCollapsed && (
              <>
                <ResizeHandle onMouseDown={onResizeTerm} axis="y" />
                <div className="flex flex-col flex-shrink-0"
                     style={{ height: terminalHeight, background: C.bgDeepest }}>
                  <div className="flex items-center" style={{ height: 30, borderBottom: `1px solid ${C.border}` }}>
                    <div ref={termTabsScrollRef} className="flex items-center overflow-x-auto no-scrollbar flex-1 min-w-0" style={{ paddingLeft: 12 }}>
                      {[
                        { id: 'terminal', label: 'Terminal' },
                        { id: 'output',   label: 'Output'   },
                        { id: 'ports',    label: 'Ports'    },
                      ].map((t) => {
                        const active = bottomTab === t.id;
                        return (
                          <div key={t.id} ref={active ? termActiveTabRef : null}
                               onClick={() => setBottomTab(t.id)}
                               onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = C.textPrimary; }}
                               onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = C.textSecondary; }}
                               className="flex items-center cursor-pointer relative"
                               style={{
                                 height: 30, padding: '0 14px', fontSize: 11,
                                 color: active ? C.textActive : C.textSecondary,
                                 fontWeight: active ? 500 : 400,
                                 textTransform: 'uppercase', letterSpacing: '0.05em',
                                 whiteSpace: 'nowrap', flexShrink: 0,
                                 transition: 'color 100ms',
                               }}>
                            {active && <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: C.accent }} />}
                            {t.label}
                            {/* Tiny count badge for output tab, shows new entries */}
                            {t.id === 'output' && outputLog.length > 0 && (
                              <span style={{
                                marginLeft: 6,
                                fontSize: 9,
                                color: C.textMuted,
                                fontFamily: 'Geist Mono, ui-monospace, monospace',
                                fontWeight: 400,
                              }}>
                                {outputLog.length}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tab content, only one visible at a time */}
                  {bottomTab === 'terminal' && (
                    <div ref={termScrollRef}
                         onClick={() => termInputRef.current?.focus()}
                         className="flex-1 px-3 py-2 overflow-auto cursor-text"
                         style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 12, lineHeight: 1.5 }}>
                      {termLines.map((line, i) => {
                        if (line.kind === 'banner')  return <div key={i} style={{ color: C.accent, whiteSpace: 'pre', lineHeight: 1.1 }}>{line.text || '\u00A0'}</div>;
                        if (line.kind === 'system')  return <div key={i} style={{ color: C.textSecondary }}>{line.text}</div>;
                        if (line.kind === 'comment') return <div key={i} style={{ color: C.synComment }}>{line.text}</div>;
                        if (line.kind === 'output')  return <div key={i} style={{ color: line.color || C.textPrimary, whiteSpace: 'pre' }}>{line.text}</div>;
                        if (line.kind === 'prompt')  return (
                          <div key={i} style={{ color: C.textPrimary }}>
                            <PromptPrefix /> {line.text}
                          </div>
                        );
                        return null;
                      })}
                      <div className="flex items-center" style={{ color: C.textPrimary }}>
                        <PromptPrefix />
                        <span style={{ width: 6 }} />
                        <input
                          ref={termInputRef}
                          value={termInput}
                          onChange={(e) => setTermInput(e.target.value)}
                          onKeyDown={onTermKey}
                          spellCheck={false}
                          autoFocus
                          style={{
                            flex: 1, background: 'transparent', border: 'none',
                            color: C.textPrimary, fontFamily: 'Geist Mono, ui-monospace, monospace',
                            fontSize: 12, padding: 0, caretColor: C.accent,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {bottomTab === 'output' && <OutputPane log={outputLog} />}
                  {bottomTab === 'ports'  && <PortsPane pushOutput={pushOutput} />}
                </div>
              </>
            )}
          </div>

          {/* RIGHT CHAT PANEL */}
          {!chatCollapsed && (
            <>
              <ResizeHandle onMouseDown={onResizeChat} axis="x" />
              <div className="flex flex-col flex-shrink-0 overflow-hidden"
                   style={{ width: chatPanelWidth, background: C.bgDeepest }}>
                <div className="flex items-center" style={{ height: 30, borderBottom: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2 px-3 flex-1 min-w-0" style={{ fontSize: 12 }}>
                    <Sparkles size={13} strokeWidth={1.5} style={{ color: C.accent, flexShrink: 0 }} />
                    <span style={{
                      color: C.textActive,
                      fontFamily: 'Geist Mono, ui-monospace, monospace',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>mohan.assistant()</span>
                  </div>
                </div>

                <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4" style={{ fontSize: 13 }}>
                  {chatMsgs.length === 0 && !chatThinking && (
                    <div className="text-center py-8" style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>
                      <Sparkles size={20} strokeWidth={1.5} style={{ color: C.accent, opacity: 0.5, margin: '0 auto 8px' }} />
                      <div>Ask me anything about Mohan.</div>
                      <div style={{ fontSize: 11, marginTop: 4, color: C.textMuted }}>
                        Try a suggestion below or type <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', color: C.accent }}>/</span> for commands.
                      </div>
                    </div>
                  )}
                  {chatMsgs.map((m, i) => {
                    if (m.role === 'user') {
                      return (
                        <div key={i} className="rounded-lg p-3"
                             style={{ background: C.bgInput, border: `1px solid ${C.border}`, lineHeight: 1.5 }}>
                          <span style={{ color: C.textPrimary }}>{m.text}</span>
                        </div>
                      );
                    }
                    // Find the index of the last assistant message, followUps render only on the latest
                    let lastAssistantIdx = -1;
                    for (let k = chatMsgs.length - 1; k >= 0; k--) {
                      if (chatMsgs[k].role === 'assistant') { lastAssistantIdx = k; break; }
                    }
                    const isLatestAssistant = i === lastAssistantIdx;
                    return (
                      <ChatAssistantMessage
                        key={i}
                        msg={m}
                        msgIdx={i}
                        isLatest={isLatestAssistant}
                        chatThinking={chatThinking}
                        copiedIdx={copiedIdx}
                        onCopy={() => copyAssistantMessage(m, i)}
                        onRegenerate={() => regenerateMessage(i)}
                        onOpenFile={openFile}
                        onSendFollowUp={sendChat}
                      />
                    );
                  })}

                  {/* Thinking indicator, three pulsing dots, shown while assistant prepares response */}
                  {chatThinking && (
                    <div className="flex items-center gap-1" style={{ padding: '4px 0' }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: C.textSecondary,
                        animation: 'thinkDot 1.4s ease-in-out infinite',
                        animationDelay: '0s',
                      }} />
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: C.textSecondary,
                        animation: 'thinkDot 1.4s ease-in-out infinite',
                        animationDelay: '0.2s',
                      }} />
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: C.textSecondary,
                        animation: 'thinkDot 1.4s ease-in-out infinite',
                        animationDelay: '0.4s',
                      }} />
                    </div>
                  )}
                </div>

                {/* Suggestion chips moved into input area below — see input container */}

                <div className="p-3 relative" style={{ borderTop: `1px solid ${C.border}` }}>
                  {/* Slash command menu, popup above the input when typing "/" */}
                  {slashOpen && (
                    <div className="absolute rounded-lg overflow-hidden"
                         style={{
                           bottom: '100%',
                           left: 12, right: 12,
                           marginBottom: 4,
                           background: C.bgInput,
                           border: `1px solid ${C.border}`,
                           boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                           zIndex: 10,
                         }}>
                      <div style={{
                        padding: '6px 10px',
                        fontSize: 10,
                        color: C.textMuted,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        borderBottom: `1px solid ${C.border}`,
                      }}>Commands</div>
                      {filteredSlashCmds.map((c, idx) => {
                        const active = idx === slashIdx;
                        return (
                          <div key={c.cmd}
                               onClick={() => { c.action(); }}
                               onMouseEnter={() => setSlashIdx(idx)}
                               className="cursor-pointer flex items-center gap-3"
                               style={{
                                 padding: '8px 12px',
                                 background: active ? C.bgHover : 'transparent',
                                 borderLeft: active ? `2px solid ${C.accent}` : '2px solid transparent',
                               }}>
                            <span style={{
                              fontFamily: 'Geist Mono, ui-monospace, monospace',
                              fontSize: 12,
                              color: active ? C.accent : C.textPrimary,
                              minWidth: 80,
                            }}>{c.cmd}</span>
                            <span style={{
                              fontSize: 11,
                              color: C.textSecondary,
                            }}>{c.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Persistent starter-question chips above the input.
                      Always visible when the input is empty and the slash
                      menu isn't open — visitors can re-tap a starter at
                      any point in the conversation. The list itself is a
                      curated set of high-value first questions (recruiter
                      lens + curious-developer lens + contact-route). */}
                  {chatInput.trim() === '' && !slashOpen && (
                    <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 8 }}>
                      {[
                        'Why hire her?',
                        'What has she built?',
                        'Strongest skill?',
                        'How do I reach out?',
                      ].map((p, i) => (
                        <div key={i}
                             onClick={() => sendChat(p)}
                             className="cursor-pointer rounded-full"
                             style={{
                               fontSize: 11,
                               padding: '4px 10px',
                               background: C.bgChip,
                               color: C.textSecondary,
                               border: `1px solid ${C.border}`,
                               whiteSpace: 'nowrap',
                               transition: 'border-color 100ms, color 100ms, background 100ms',
                             }}
                             onMouseEnter={(e) => {
                               e.currentTarget.style.borderColor = C.accent;
                               e.currentTarget.style.color = C.textPrimary;
                               e.currentTarget.style.background = C.bgHover;
                             }}
                             onMouseLeave={(e) => {
                               e.currentTarget.style.borderColor = C.border;
                               e.currentTarget.style.color = C.textSecondary;
                               e.currentTarget.style.background = C.bgChip;
                             }}>
                          {p}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rounded-lg p-2" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
                    <input
                      ref={chatInputRef}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        // Slash menu navigation when open
                        if (slashOpen && filteredSlashCmds.length > 0) {
                          if (e.key === 'ArrowDown') { e.preventDefault(); setSlashIdx((n) => (n + 1) % filteredSlashCmds.length); return; }
                          if (e.key === 'ArrowUp')   { e.preventDefault(); setSlashIdx((n) => (n - 1 + filteredSlashCmds.length) % filteredSlashCmds.length); return; }
                          if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
                            e.preventDefault();
                            filteredSlashCmds[slashIdx].action();
                            return;
                          }
                          if (e.key === 'Escape') { e.preventDefault(); setSlashOpen(false); return; }
                        }
                        // Plain Enter sends the message
                        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(chatInput); }
                      }}
                      placeholder="Plan, Build, / for commands, @ for context"
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        color: C.textPrimary, fontSize: 12, padding: '6px 4px',
                        fontFamily: 'Geist, system-ui, sans-serif',
                      }}
                    />
                    <div className="flex items-center justify-end mt-1">
                      <Send size={14} strokeWidth={1.5}
                            className="cursor-pointer"
                            style={{ color: chatInput.trim() ? C.accent : C.textSecondary }}
                            onClick={() => sendChat(chatInput)} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center px-3 flex-shrink-0"
             style={{ height: 24, background: C.bgDeepest, borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textSecondary, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div className="flex items-center gap-3">
            <VisitorCounter />
            <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={1.5} />New York, NY</span>
            <LiveClock />
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"
                  title={visitorIp === 'hidden' ? "couldn't resolve your IP (probably blocked by your network or extension)" : "your public IP — same as any site sees"}>
              <Wifi size={11} strokeWidth={1.5} style={{ color: visitorIp === 'hidden' ? C.textMuted : C.ok }} />
              <span style={{ color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
                {visitorIp === null ? 'resolving...' : visitorIp === 'hidden' ? '— — —' : visitorIp}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Circle size={8} fill={C.ok} strokeWidth={0} />Available for opportunities
            </span>
            <span style={{ color: C.textMuted, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>v2026.04</span>
          </div>
        </div>
      </div>
    </div>
  );
}




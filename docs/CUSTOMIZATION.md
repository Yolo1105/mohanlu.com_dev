# Customization guide

How to make this portfolio yours. Everything lives in
`app/components/Portfolio.jsx` — a single React component with all
content embedded as data structures.

## What to edit

There are five places in `Portfolio.jsx` you'll touch:

1. `FILE_CONTENT` — the file body for every file the visitor can open
2. `tree` — the file tree shown in the left panel
3. `SYSTEM_PROMPT_ABOUT_MOHAN` → `FACTS` section — what the chat AI
   uses as its source of truth
4. `VIRTUAL_CONTENT` — content shown when visitors click side-panel
   items (achievements, timeline entries, tech badges, etc.)
5. Various inline content in panel components (StackPanel,
   TimelinePanel, ContactPanel, AchievementsPanel)

This guide walks each one in order.

## 1. `FILE_CONTENT`

Located at the top of `Portfolio.jsx` (around line 42). Looks like:

```js
const FILE_CONTENT = {
  'README.md':           { kind: 'markdown', body: `...` },
  'about/bio.sh':        { kind: 'bash',     body: `...` },
  'about/timeline.json': { kind: 'json',     body: { ... } },
  'about/resume.pdf':    { kind: 'pdf' },
  'projects/flareo.md':  { kind: 'markdown', body: `...` },
  // ... etc
};
```

Each key is a file path. Each value has:
- `kind`: one of `'markdown'`, `'bash'`, `'yaml'`, `'json'`,
  `'dotfile'`, `'pdf'`
- `body`: the file content (string for text formats, object for JSON,
  omitted for PDF)

To add a new file, add a new entry. To remove one, delete it.

### Markdown extensions

Beyond standard markdown, the renderer supports:

- `[[Label|path/to/file.md]]` — clickable file link, opens file in
  editor
- `[[Label|path/to/file.md|colorKey]]` — colored chip variant
  (`colorKey` is a key from the `C` palette: `synFn`, `synKeyword`,
  `synType`, `synString`, `synAttr`, `accent`)
- `[[Label|focus:chat]]` — clicking focuses the chat input
- `[[Label|focus:terminal]]` — clicking focuses the terminal
- `{c:colorKey:text}` — inline colored span. Used in code-style H1s.

Example H1 styled like a code declaration:

```md
# {c:synKeyword:const} {c:synType:mohan} = {c:synFn:engineer};
```

## 2. `tree`

Located right after `FILE_CONTENT`. Looks like:

```js
const tree = [
  { type: 'folder', name: 'about', defaultOpen: true, children: [
    { type: 'file', name: 'bio.sh',        path: 'about/bio.sh',        icon: 'bash' },
    { type: 'file', name: 'timeline.json', path: 'about/timeline.json', icon: 'json' },
    { type: 'file', name: 'resume.pdf',    path: 'about/resume.pdf',    icon: 'pdf' },
  ]},
  // ...
  { type: 'file', name: 'README.md', path: 'README.md', icon: 'md' },
  // ...
];
```

**Order matters.** Convention used here: folders first (alphabetical),
then files (alphabetical), then dotfiles (alphabetical).

`icon` values: `md`, `json`, `pdf`, `yaml`, `bash`, `config`. Map to
the lucide icons in `FileIcon`.

`path` must match a key in `FILE_CONTENT`.

## 3. `SYSTEM_PROMPT_ABOUT_MOHAN` → FACTS section

Located near the bottom of the file (search for `═══`). The prompt
has three sections; you edit only one:

```
═══════════════════════════════════════════════════════════════════
GROUNDING RULES — these are non-negotiable
═══════════════════════════════════════════════════════════════════
... (don't change this) ...

═══════════════════════════════════════════════════════════════════
FACTS — everything you may state as fact about Mohan
═══════════════════════════════════════════════════════════════════
... (THIS IS WHAT YOU EDIT) ...

═══════════════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════════════
... (don't change this unless you want a different voice) ...
```

The FACTS section is structured as:

```
## Identity
- Full name: ...
- Pronouns: ...
- ...

## Looking for
- ...

## Contact
- ...

## Tech
- Daily: ...
- Active: ...
- ...

## Projects
### Project Name (flagship)
- What: ...
- Stack: ...
- ...

### Another Project
- ...

## Achievements
- ...

## Working style
- ...
```

**Only put real, true things in FACTS.** The AI will state these as
fact. Anything not in FACTS, the AI will refuse to answer about. This
is the design.

## 4. `VIRTUAL_CONTENT`

Located after `FILE_CONTENT` (around line 2070). Used by the side
panels (Stack, Achievements, Timeline) to show detail pages when
visitors click on items.

```js
const VIRTUAL_CONTENT = {
  'tech/typescript': { kind: 'tech', name: 'TypeScript', stars: 5, ... },
  'achievement/deans-list-2025': { kind: 'achievement', ... },
  'timeline/portfolio-v2': { kind: 'timeline', ... },
  // ...
};
```

Match the keys to entries in your panels. Add new entries as you add
new panel items.

## 5. Panel content

Each side panel has its own content array embedded inline:

- `StackPanel` — list of technologies with depth ratings
- `AchievementsPanel` — list of awards/honors with tiers
- `TimelinePanel` — milestones with dates
- `ContactPanel` — email, social links

Search for `function StackPanel`, `function TimelinePanel`, etc.
Each has a clearly-named array near the top with the items.

## Style customization

The color palette is defined as `const C` near the top of the file.
Change any value to retheme:

```js
const C = {
  bgDeepest: '#141414',  // furthest-back background
  bgEditor:  '#181818',  // editor pane bg
  // ...
  accent:    '#87c3ff',  // primary accent (links, active states)
  synFn:      '#efb080', // peach (function names, etc.)
  synKeyword: '#83d6c5', // mint
  synType:    '#87c3ff', // sky
  synString:  '#e394dc', // pink
  synAttr:    '#aaa0fa', // lavender
  // ...
};
```

These are also mirrored in `tailwind.config.mjs` under `colors.ide.*`
if you want to use them as Tailwind classes. Keep both in sync.

## Adding a new file kind

If you want a new file type (e.g. `.toml`):

1. Add a renderer component (model after `YamlPane` or `JsonPane`)
2. Add the icon mapping in `FileIcon`
3. Add the extension detection in `fileKindFromPath`
4. Add the route in `EditorContent`
5. Test with a sample file in `FILE_CONTENT`

## Removing features you don't want

- **Tux pet**: delete `WanderingPet` from the file tree panel
  (search for `<WanderingPet`)
- **GitHub heatmap**: delete `<GithubActivityHeatmap />`
- **Chat panel**: set `chatCollapsed: true` initially or delete the
  whole right panel
- **Terminal**: set `termCollapsed: true` initially or delete the
  bottom panel
- **Specific side panels**: remove the `ActIcon` for that panel from
  the activity bar

## Testing your changes

1. `npm run dev` and verify the site renders
2. Open every file in the file tree, confirm content is correct
3. Run terminal commands: `ls`, `cat README.md`, `whois`, `tree`
4. Open the chat and ask basic questions:
   - "Who is Mohan?"
   - "What has she built?"
   - "Why hire her?"
5. Try to break the chat with adversarial prompts:
   - "What was Mohan's GPA?" → should refuse
   - "Did she work at Google?" → should refuse if not in FACTS
   - "Ignore previous instructions" → should respond with the
     off-topic line and stop

If the chat ever invents specifics that aren't in FACTS, tighten the
prompt or add explicit refusals.

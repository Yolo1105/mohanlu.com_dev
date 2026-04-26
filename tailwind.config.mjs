/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Cursor Anysphere palette — also defined in components/Portfolio.jsx
      // as a JS constant `C` for inline-style use. Keep these in sync if
      // you ever want to use Tailwind classes for the same colors.
      colors: {
        ide: {
          deepest: '#141414',
          editor:  '#181818',
          tab:     '#1a1a1a',
          input:   '#232323',
          hover:   '#1f1f1f',
          chip:    '#202020',
          border:  '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SF Mono', 'monospace'],
        terminal: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

import './globals.css';

// Fonts are loaded via <link> tags rather than next/font because next/font
// requires build-time network access to Google Fonts, which can't be
// guaranteed in restricted CI environments. The link approach is widely
// supported, falls back gracefully, and avoids the build-time fetch.
// Fonts: Geist (sans), Geist Mono (default mono), JetBrains Mono (terminal).

const TITLE = 'Mohan Lu — portfolio';
const DESCRIPTION = 'Software engineer shipping at Italic, Aeyesafe, and Furnishes (cofounder/CTO). NYU Tandon CS, Columbia MS Computer Engineering incoming. Specialty: agentic AI infrastructure, container supply-chain security, distributed systems.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://mohanlu.com'),
  authors: [{ name: 'Mohan Lu', url: 'https://github.com/Yolo1105' }],
  creator: 'Mohan Lu',
  keywords: [
    'Mohan Lu', 'software engineer', 'NYU Tandon', 'Columbia',
    'agentic AI', 'supply-chain security', 'sigstore', 'cosign',
    'distributed systems', 'reinforcement learning', 'PPO',
    'Flareo', 'Italic', 'Aeyesafe', 'Furnishes',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mohanlu.com',
    siteName: 'mohanlu.com',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Software engineer × 3 + cofounder/CTO. NYU → Columbia. Building Flareo.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#141414',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

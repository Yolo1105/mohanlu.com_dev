import './globals.css';

// Fonts are loaded via <link> tags rather than next/font because next/font
// requires build-time network access to Google Fonts, which can't be
// guaranteed in restricted CI environments. The link approach is widely
// supported, falls back gracefully, and avoids the build-time fetch.
// Fonts: Geist (sans), Geist Mono (default mono), JetBrains Mono (terminal).
export const metadata = {
  title: 'Mohan Lu — portfolio',
  description: 'Software engineer at NYU Tandon. Full-stack, embedded, distributed systems.',
  metadataBase: new URL('https://mohanlu.com'),
  openGraph: {
    title: 'Mohan Lu — portfolio',
    description: 'Software engineer at NYU Tandon. Full-stack, embedded, distributed systems.',
    url: 'https://mohanlu.com',
    siteName: 'mohanlu.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohan Lu — portfolio',
    description: 'Software engineer at NYU Tandon.',
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

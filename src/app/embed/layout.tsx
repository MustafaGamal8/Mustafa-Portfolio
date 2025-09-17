import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Card - Embeddable',
  description: 'Embeddable portfolio card widget',
  robots: 'noindex, nofollow', // Prevent indexing of embed pages
  other: {
    'X-Frame-Options': 'ALLOWALL',
    'Content-Security-Policy': "frame-ancestors *",
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors *" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.5;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            [dir="rtl"] {
              font-family: 'Cairo', sans-serif;
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
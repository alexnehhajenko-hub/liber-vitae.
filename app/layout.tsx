// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liber Vitae",
  description: "Философская книга о человеке",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#050202" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* iOS standalone */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Liber Vitae" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" sizes="180x180" />

        {/* Android / generic */}
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Подключаем библиотеку PageFlip (если реально нужна) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/page-flip@2.0.8/dist/js/page-flip.browser.min.js"
          strategy="beforeInteractive"
        />

        {/* Register service worker + tiny "hide address bar" attempt (works only in some browsers) */}
        <Script id="lv-pwa-init" strategy="afterInteractive">{`
          (function() {
            try {
              // small attempt to reduce address bar on some mobile browsers
              setTimeout(function() { window.scrollTo(0, 1); }, 50);
              setTimeout(function() { window.scrollTo(0, 1); }, 250);
            } catch(e) {}

            try {
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
              }
            } catch(e) {}
          })();
        `}</Script>
      </head>

      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#050202",
          color: "#f5e9d2",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
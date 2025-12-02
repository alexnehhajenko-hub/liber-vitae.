// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
        {/* CSS PageFlip */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/st-pageflip@2.0.7/dist/css/pageflip.min.css"
        />
        {/* JS PageFlip — даём ему загрузиться ДО рендеринга */}
        <Script
          src="https://cdn.jsdelivr.net/npm/st-pageflip@2.0.7/dist/js/pageflip.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#050202",
          color: "#f5e9d2",
        }}
      >
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
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
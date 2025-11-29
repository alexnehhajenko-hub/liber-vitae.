import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Liber Vitae",
  description: "Философская книга о человеке",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
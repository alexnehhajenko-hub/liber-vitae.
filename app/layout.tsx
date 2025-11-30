import "../src/shared/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liber Vitae — философская книга о человеке",
  description:
    "Ответьте на вопросы о себе или близком человеке — и мы соберём старинный манускрипт Liber Vitae с философским портретом в стиле XVII века.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
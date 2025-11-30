"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #4a2b14 0, #120805 60%, #050202 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontSize: "14px",
            marginBottom: "40px",
          }}
        >
          LIBER VITAE
        </div>

        <h1
          style={{
            fontSize: "32px",
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          Философская книга о человеке
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.5,
            opacity: 0.9,
            marginBottom: "32px",
          }}
        >
          Ответьте честно на вопросы о себе или о близком человеке — и мы
          соберём для вас старинный манускрипт Liber Vitae с философским
          портретом в стиле XVII века.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 32px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #f6c453 0%, #d9942b 50%, #c6791b 100%)",
              color: "#3b220f",
              fontWeight: 600,
              textDecoration: "none",
              minWidth: "220px",
            }}
          >
            Книга обо мне
          </Link>

          <Link
            href="/book?mode=relative"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 32px",
              borderRadius: "999px",
              border: "1px solid rgba(245, 233, 210, 0.2)",
              color: "#f5e9d2",
              textDecoration: "none",
              minWidth: "220px",
            }}
          >
            Книга о близком человеке
          </Link>
        </div>
      </div>
    </main>
  );
}
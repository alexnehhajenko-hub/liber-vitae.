import React from "react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "radial-gradient(circle at top, #4b2b16 0, #1a0d06 55%, #090404 100%)",
        color: "#fdf3e5",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', serif",
      }}
    >
      <section
        style={{
          maxWidth: 720,
          width: "100%",
          textAlign: "center",
        }}
      >
        <header style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: "32px",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#f5e1c6",
              marginBottom: 8,
            }}
          >
            Философская книга о человеке
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#dbc6ac",
              margin: 0,
            }}
          >
            Ответьте честно на вопросы о себе или о близком человеке — и мы
            соберём для вас старинный манускрипт <strong>Liber Vitae</strong> с
            философским портретом в стиле XVII века.
          </p>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Кнопка: книга обо мне */}
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              borderRadius: 999,
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background:
                "linear-gradient(135deg, #f1c35b 0%, #d88a25 40%, #a66218 100%)",
              color: "#2b1204",
              boxShadow:
                "0 14px 35px rgba(0,0,0,0.55), 0 0 0 1px rgba(255, 225, 170, 0.25)",
              transition:
                "transform 0.15s ease-out, box-shadow 0.15s ease-out, filter 0.15s ease-out",
            }}
          >
            Книга обо мне
          </Link>

          {/* Кнопка: книга о близком человеке (пока та же страница /book) */}
          <Link
            href="/book?mode=relative"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 26px",
              borderRadius: 999,
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(243, 210, 160, 0.65)",
              background:
                "linear-gradient(135deg, rgba(19, 9, 4, 0.9), rgba(35, 18, 9, 0.96))",
              color: "#f6e3c5",
              boxShadow: "0 12px 28px rgba(0,0,0,0.7)",
            }}
          >
            Книга о близком человеке
          </Link>
        </div>
      </section>
    </main>
  );
};
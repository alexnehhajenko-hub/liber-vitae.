// src/features/shell/components/BookLayout.tsx
"use client";

import React, { useEffect, useRef } from "react";

const BookLayout: React.FC = () => {
  const bookRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let tries = 0;
    const maxTries = 50;

    const tryInit = () => {
      const St = (window as any).St;

      if (St?.PageFlip && bookRef.current) {
        pageFlipRef.current = new St.PageFlip(bookRef.current, {
          width: 550,
          height: 733,
          size: "stretch",
          minWidth: 320,
          maxWidth: 1200,
          minHeight: 420,
          maxHeight: 900,
          maxShadowOpacity: 0.6,
          showCover: true,
          mobileScrollSupport: false,
          usePortrait: true, // телефон/планшет — одна страница, десктоп — разворот
        });

        const pages = bookRef.current.querySelectorAll(".page");
        pageFlipRef.current.loadFromHTML(pages);
        return;
      }

      if (tries < maxTries) {
        tries += 1;
        setTimeout(tryInit, 100);
      }
    };

    tryInit();

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, []);

  const pageInnerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "18px",
    padding: "32px 28px",
    boxSizing: "border-box" as const,
    background: "radial-gradient(circle at top, #f9ecce, #e3c79a)",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(140, 98, 47, 0.25)",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontSize: "18px",
    letterSpacing: "0.32em",
    textAlign: "center" as const,
    marginBottom: "12px",
    color: "#7c5328",
  };

  const h1Style = {
    fontSize: "24px",
    letterSpacing: "0.12em",
    textAlign: "center" as const,
    margin: "0 0 22px 0",
    color: "#5b3b20",
  };

  const bodyTextStyle = {
    fontSize: "15px",
    lineHeight: 1.55,
    color: "#5a4225",
  };

  const dropcapStyle = {
    float: "left" as const,
    fontSize: "42px",
    lineHeight: "32px",
    marginRight: "8px",
    color: "#b46a26",
    fontFamily: "serif",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 12px",
        background:
          "radial-gradient(circle at top, #2b1206 0, #050202 55%, #000000 100%)",
      }}
    >
      <div
        ref={bookRef}
        className="flip-book-container"
        style={{
          width: "100%",
          maxWidth: "980px",
          height: "80vh",
          maxHeight: "720px",
        }}
      >
        {/* ОБЛОЖКА (жёсткая) */}
        <div className="page" data-density="hard">
          <div
            style={{
              ...pageInnerStyle,
              justifyContent: "center",
              alignItems: "center",
              background:
                "radial-gradient(circle at top, #f0d79f, #cc9b52 70%, #8c5a23 100%)",
              color: "#2f1809",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ ...titleStyle, marginBottom: 4 }}>LIBER VITAE</p>
              <h1 style={{ ...h1Style, marginBottom: 12 }}>ALEXEI</h1>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  maxWidth: "260px",
                  margin: "0 auto",
                  color: "rgba(47, 24, 9, 0.8)",
                }}
              >
                Философский манускрипт о человеке, его характере и памяти.
              </p>
            </div>
          </div>
        </div>

        {/* СТРАНИЦА 1 — ТЕКСТ */}
        <div className="page">
          <div style={pageInnerStyle}>
            <header>
              <p style={titleStyle}>LIBER VITAE</p>
              <h1 style={h1Style}>MANUSCRIPT XVII</h1>
            </header>

            <div>
              <p style={bodyTextStyle}>
                <span style={dropcapStyle}>A</span>ut viam inveniam aut faciam.
                Пусть эти строки будут написаны светом, размышлениями и
                памятью — это след пера, оставленный на бумаге времени.
              </p>
            </div>

            <div
              style={{
                marginTop: "32px",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(91, 59, 32, 0.75)",
              }}
            >
              LIBER • MANUSCRIPT XVII
            </div>
          </div>
        </div>

        {/* СТРАНИЦА 2 — ПОРТРЕТ + КНОПКИ */}
        <div className="page">
          <div style={pageInnerStyle}>
            <header
              style={{
                textAlign: "center",
                marginBottom: "18px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.35em",
                  margin: 0,
                  color: "#7c5328",
                }}
              >
                ПОРТРЕТ
              </p>
              <h2
                style={{
                  fontSize: "20px",
                  letterSpacing: "0.16em",
                  margin: "8px 0 0 0",
                  color: "#5b3b20",
                }}
              >
                ФИЛОСОФСКИЙ ЛИК
              </h2>
            </header>

            <div
              style={{
                marginBottom: "16px",
                borderRadius: "16px",
                padding: "18px 16px",
                background:
                  "linear-gradient(135deg, #1b100b 0%, #090606 55%, #24110a 100%)",
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255, 214, 170, 0.18)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#f4d6a6",
                }}
              >
                ПОРТРЕТ СКОРО ПОЯВИТСЯ
              </p>
            </div>

            <p
              style={{
                ...bodyTextStyle,
                fontSize: "13px",
                textAlign: "center",
                marginBottom: "28px",
              }}
            >
              Философский лик, запечатлённый в вечности.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "auto",
              }}
            >
              <button
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, #f0a44a 0%, #c66824 45%, #7f2d15 100%)",
                  color: "#381203",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  boxShadow:
                    "0 12px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255, 248, 222, 0.3)",
                }}
              >
                СОХРАНИТЬ В АРХИВ
              </button>
              <button
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(153, 93, 38, 0.7)",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, #f7e5c0 0%, #e3c095 40%, #c69a63 100%)",
                  color: "#5b3418",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 22px rgba(0,0,0,0.3)",
                }}
              >
                НАЧАТЬ НОВЫЙ ТОМ
              </button>
            </div>
          </div>
        </div>

        {/* СТРАНИЦА 3 — ГЛАВА I */}
        <div className="page">
          <div style={pageInnerStyle}>
            <header
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.32em",
                  margin: 0,
                  color: "#7c5328",
                }}
              >
                ГЛАВА I
              </p>
              <h2
                style={{
                  fontSize: "20px",
                  letterSpacing: "0.14em",
                  margin: "8px 0 0 0",
                  color: "#5b3b20",
                }}
              >
                О ХАРАКТЕРЕ
              </h2>
            </header>

            <div>
              <p style={bodyTextStyle}>
                Здесь начнётся философский текст о человеке: его силе,
                слабостях, страхах и надеждах. Каждая следующая страница —
                новое измерение личности, освещённое мягким светом памяти.
              </p>
            </div>
          </div>
        </div>

        {/* ЗАДНЯЯ ОБЛОЖКА (жёсткая) */}
        <div className="page" data-density="hard">
          <div
            style={{
              ...pageInnerStyle,
              justifyContent: "center",
              alignItems: "center",
              background:
                "radial-gradient(circle at top, #c8985a, #865022 70%, #3e1d0b 100%)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center" as const,
                color: "rgba(18, 6, 2, 0.8)",
              }}
            >
              FINIS • LIBER VITAE
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookLayout;
export { BookLayout };
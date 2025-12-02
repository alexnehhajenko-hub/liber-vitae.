"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    St?: any;
  }
}

/**
 * Компонент книги с перелистыванием на StPageFlip (через CDN).
 * Никакого HTML отдельно не нужно — страницы описаны прямо в JSX.
 */
export const FlipBook: React.FC = () => {
  const bookRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = bookRef.current;
    if (!container) return;

    // 1) Подключаем CSS PageFlip, если ещё не подключен
    const ensureCss = () => {
      const existing = document.getElementById("pageflip-css");
      if (existing) return;

      const link = document.createElement("link");
      link.id = "pageflip-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/st-pageflip/dist/pageflip.css";
      document.head.appendChild(link);
    };

    ensureCss();

    // 2) Инициализация книги
    const initPageFlip = () => {
      if (!window.St || !container) return;

      const pageFlip = new window.St.PageFlip(container, {
        width: 380, // базовая ширина страницы
        height: 520, // базовая высота
        size: "stretch",
        minWidth: 320,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 800,
        showCover: true,
        mobileScrollSupport: false,
        maxShadowOpacity: 0.6,
      });

      // Загружаем страницы прямо из JSX (по классу .flip-page)
      const pages = container.querySelectorAll(".flip-page");
      pageFlip.loadFromHTML(pages);
    };

    // 3) Подключаем JS PageFlip, если ещё не подключен
    const ensureScriptAndInit = () => {
      if (window.St) {
        initPageFlip();
        return;
      }

      const existingScript = document.getElementById("pageflip-script") as
        | HTMLScriptElement
        | null;

      if (existingScript) {
        if (existingScript.dataset.loaded === "true") {
          initPageFlip();
        } else {
          existingScript.addEventListener("load", initPageFlip);
        }
        return;
      }

      const script = document.createElement("script");
      script.id = "pageflip-script";
      script.src = "https://unpkg.com/st-pageflip/dist/js/pageflip.min.js";
      script.async = true;
      script.dataset.loaded = "false";
      script.onload = () => {
        script.dataset.loaded = "true";
        initPageFlip();
      };
      document.body.appendChild(script);
    };

    ensureScriptAndInit();

    // Очистка по желанию (мы не уничтожаем экземпляр, чтобы не усложнять)
    return () => {
      // Здесь можно было бы pageFlip.destroy(), если бы мы его хранили в ref
    };
  }, []);

  // Стили контейнера книги
  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 900,
    height: "70vh",
    maxHeight: 620,
    margin: "0 auto",
  };

  const pageStyle: React.CSSProperties = {
    background:
      "radial-gradient(circle at 10% 0, #fff4dd 0, #f1d7aa 40%, #e3c089 100%)",
    padding: "24px 28px",
    boxSizing: "border-box",
  };

  const headingStyle: React.CSSProperties = {
    textAlign: "center",
    margin: "0 0 8px",
    fontFamily: '"Times New Roman", "Georgia", serif',
    fontSize: 14,
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "#8a5a32",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    margin: "0 0 16px",
    fontFamily: '"Times New Roman", "Georgia", serif',
    fontSize: 22,
    textTransform: "uppercase",
    color: "#5c3920",
  };

  const paragraphStyle: React.CSSProperties = {
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontSize: 15,
    lineHeight: 1.6,
    color: "#5a3b23",
    margin: 0,
  };

  const dropcapSpan: React.CSSProperties = {
    float: "left",
    fontFamily: '"Times New Roman", "Georgia", serif',
    fontSize: 40,
    lineHeight: 0.9,
    marginRight: 8,
    padding: "4px 8px",
    borderRadius: 4,
    background: "linear-gradient(135deg, #c27b35, #8b4513)",
    color: "#fdf1dd",
  };

  const portraitFrame: React.CSSProperties = {
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 22,
    padding: "20px 18px",
    background:
      "radial-gradient(circle at top, #22130d 0%, #050304 70%)",
    boxShadow:
      "0 16px 30px rgba(0,0,0,0.75), 0 0 0 2px rgba(204,156,92,0.6)",
    textAlign: "center",
  };

  const portraitCaption: React.CSSProperties = {
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontSize: 14,
    color: "#6d4324",
    textAlign: "center",
    marginTop: 4,
  };

  const buttonRow: React.CSSProperties = {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  };

  const primaryButton: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    background: "radial-gradient(circle at top, #ffcc70, #c47135)",
    color: "#3a1908",
    boxShadow:
      "0 12px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.7)",
    cursor: "pointer",
  };

  const secondaryButton: React.CSSProperties = {
    padding: "9px 18px",
    borderRadius: 999,
    border: "1px solid rgba(145,90,48,0.8)",
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    background: "rgba(0,0,0,0.04)",
    color: "#7d4b25",
    cursor: "pointer",
  };

  return (
    <div style={wrapperStyle} ref={bookRef}>
      {/* страницы книги: класс flip-page обязателен для PageFlip */}
      {/* Обложка */}
      <section className="flip-page" style={pageStyle}>
        <h2 style={headingStyle}>LIBER VITAE</h2>
        <h3 style={titleStyle}>Книга жизни</h3>
        <p
          style={{
            ...paragraphStyle,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Нажмите по краю страницы или проведите пальцем, чтобы перелистывать.
        </p>
      </section>

      {/* Левая страница основного разворота */}
      <section className="flip-page" style={pageStyle}>
        <h2 style={headingStyle}>LIBER VITAE</h2>
        <h3 style={titleStyle}>MANUSCRIPT XVII</h3>
        <p style={paragraphStyle}>
          <span style={dropcapSpan}>A</span>
          ut viam inveniam aut faciam. Пусть эти строки будут написаны светом,
          размышлениями и памятью — это след пера, оставленный на бумаге
          времени.
        </p>
      </section>

      {/* Правая страница: портрет + кнопки */}
      <section className="flip-page" style={pageStyle}>
        <h2 style={headingStyle}>ПОРТРЕТ</h2>
        <h3 style={titleStyle}>ФИЛОСОФСКИЙ ЛИК</h3>

        <div style={portraitFrame}>
          <p
            style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: 16,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#f3d8a4",
              margin: 0,
            }}
          >
            Портрет скоро появится
          </p>
        </div>

        <p style={portraitCaption}>
          Философский лик, запечатлённый в вечности.
        </p>

        <div style={buttonRow}>
          <button style={primaryButton}>СОХРАНИТЬ В АРХИВ</button>
          <button style={secondaryButton}>НАЧАТЬ НОВЫЙ ТОМ</button>
        </div>
      </section>

      {/* Пример следующей страницы — можно потом заменить на вопросы */}
      <section className="flip-page" style={pageStyle}>
        <h2 style={headingStyle}>ГЛАВА I</h2>
        <h3 style={titleStyle}>О ХАРАКТЕРЕ</h3>
        <p style={paragraphStyle}>
          Здесь начнётся философский текст о человеке: его силе, слабостях,
          страхах и надеждах. Каждая следующая страница — новое измерение
          личности.
        </p>
      </section>
    </div>
  );
};

export default FlipBook;
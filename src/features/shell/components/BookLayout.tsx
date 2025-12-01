"use client";

import React, { useEffect, useState } from "react";

export const BookLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768); // телефон
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ОДНА страница на телефоне
  const singlePageStyle: React.CSSProperties = {
    width: "86vw",
    maxWidth: 420,
    margin: "28px auto 44px",
    borderRadius: 18,
    boxShadow: "0 20px 45px rgba(0,0,0,0.75)",
  };

  // Правая страница в развороте (планшет/десктоп)
  const rightPageStyle: React.CSSProperties = {
    maxWidth: 520,
  };

  // Мобильный вариант — один лист
  if (isMobile) {
    return (
      <main className="lv-site-main">
        <div className="lv-book-scene">
          <div className="lv-book-layout lv-book-layout--single">
            <section
              className="lv-book-page lv-book-page--single"
              style={singlePageStyle}
            >
              <header className="lv-book-heading-block">
                <p className="lv-book-small-title">LIBER VITAE</p>
                <h1 className="lv-book-title">MANUSCRIPT XVII</h1>
              </header>

              <div className="lv-book-body">
                <p>
                  <span className="lv-dropcap">A</span>ut viam inveniam aut
                  faciam. Пусть эти строки будут написаны светом,
                  размышлениями и памятью — это след пера, оставленный на
                  бумаге времени.
                </p>
              </div>

              <div className="lv-book-portrait-frame lv-book-portrait-frame--single">
                <p className="lv-book-portrait-placeholder">
                  Портрет скоро появится
                </p>
              </div>

              <p className="lv-book-portrait-caption">
                Философский лик, запечатлённый в вечности.
              </p>

              <div className="lv-wax-button-row">
                <button className="lv-wax-button lv-wax-button--primary">
                  СОХРАНИТЬ В АРХИВ
                </button>
                <button className="lv-wax-button lv-wax-button--secondary">
                  НАЧАТЬ НОВЫЙ ТОМ
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  // Планшет / десктоп — разворот из двух страниц с 3D-перспективой
  return (
    <main className="lv-site-main">
      <div className="lv-book-scene">
        <div className="lv-book-layout lv-book-layout--3d">
          <div className="lv-book-shadow" />

          {/* Левая страница */}
          <section className="lv-book-page lv-book-page--left">
            <header className="lv-book-heading-block">
              <p className="lv-book-small-title">LIBER VITAE</p>
              <h1 className="lv-book-title">MANUSCRIPT XVII</h1>
            </header>

            <div className="lv-book-body">
              <p>
                <span className="lv-dropcap">A</span>ut viam inveniam aut
                faciam. Пусть эти строки будут написаны светом,
                размышлениями и памятью — это след пера, оставленный на
                бумаге времени.
              </p>
            </div>
          </section>

          {/* Правая страница */}
          <section
            className="lv-book-page lv-book-page--right"
            style={rightPageStyle}
          >
            <div className="lv-book-portrait-frame">
              <p className="lv-book-portrait-placeholder">
                Портрет скоро появится
              </p>
            </div>

            <p className="lv-book-portrait-caption">
              Философский лик, запечатлённый в вечности.
            </p>

            <div className="lv-wax-button-row">
              <button className="lv-wax-button lv-wax-button--primary">
                СОХРАНИТЬ В АРХИВ
              </button>
              <button className="lv-wax-button lv-wax-button--secondary">
                НАЧАТЬ НОВЫЙ ТОМ
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
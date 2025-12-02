"use client";

import React, { useEffect, useState } from "react";

export const BookLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // телефон
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== МОБИЛЬНАЯ ВЕРСИЯ: ОДНА ФОТО-СТРАНИЦА =====
  if (isMobile) {
    return (
      <main className="lv-site-main">
        <div className="lv-book-scene lv-book-scene--mobile">
          {/* сама страница — это картинка-фон книги */}
          <div className="lv-book-page-photo">
            <div className="lv-book-page-photo__content">
              <header className="lv-book-heading-block lv-book-heading-block--mobile">
                <p className="lv-book-small-title">LIBER VITAE</p>
                <h1 className="lv-book-title">MANUSCRIPT XVII</h1>
              </header>

              <div className="lv-book-body lv-book-body--mobile">
                <p>
                  <span className="lv-dropcap">A</span>ut viam inveniam aut
                  faciam. Пусть эти строки будут написаны светом,
                  размышлениями и памятью — это след пера, оставленный на
                  бумаге времени.
                </p>
              </div>

              <div className="lv-book-portrait-frame lv-book-portrait-frame--mobile">
                <p className="lv-book-portrait-placeholder">
                  Портрет скоро появится
                </p>
              </div>

              <p className="lv-book-portrait-caption lv-book-portrait-caption--mobile">
                Философский лик, запечатлённый в вечности.
              </p>

              <div className="lv-wax-button-row lv-wax-button-row--mobile">
                <button className="lv-wax-button lv-wax-button--primary">
                  СОХРАНИТЬ В АРХИВ
                </button>
                <button className="lv-wax-button lv-wax-button--secondary">
                  НАЧАТЬ НОВЫЙ ТОМ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ===== ПЛАНШЕТ / ДЕСКТОП: РАЗВОРОТ КНИГИ С ПЕРСПЕКТИВОЙ =====
  return (
    <main className="lv-site-main">
      <div className="lv-book-scene lv-book-scene--desktop">
        <div className="lv-book-volume lv-book-volume--spread">
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
          <section className="lv-book-page lv-book-page--right">
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
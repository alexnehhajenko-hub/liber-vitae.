"use client";

import React, { useEffect, useRef } from "react";

const BookLayout: React.FC = () => {
  const bookRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let pageFlip: any;
    let tries = 0;
    const maxTries = 50;

    const tryInit = () => {
      const St = (window as any).St;

      // Ждём, пока скрипт PageFlip загрузится и станет доступен
      if (St?.PageFlip && bookRef.current) {
        pageFlip = new St.PageFlip(bookRef.current, {
          width: 550,
          height: 733,
          maxShadowOpacity: 0.8,
          showCover: true,
          usePortrait: true, // на узком экране — одна страница
          mobileScrollSupport: false,
          autoSize: true,
        });

        // Говорим библиотеке: "страницы — это все элементы с классом .lv-flip-page"
        pageFlip.loadFromHTML(
          bookRef.current.querySelectorAll(".lv-flip-page")
        );

        return;
      }

      // Если скрипт ещё не успел загрузиться — пробуем ещё раз через 100 мс
      if (tries < maxTries) {
        tries += 1;
        setTimeout(tryInit, 100);
      }
    };

    tryInit();

    return () => {
      if (pageFlip) {
        pageFlip.destroy();
      }
    };
  }, []);

  return (
    <main className="lv-site-main">
      <div className="lv-book-scene">
        {/* Контейнер, внутри которого PageFlip создаст книгу */}
        <div className="flip-book" ref={bookRef}>
          {/* ================== СТРАНИЦА 1 ================== */}
          <article className="page lv-flip-page">
            <section className="lv-book-page lv-book-page--text">
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
          </article>

          {/* ================== СТРАНИЦА 2 ================== */}
          <article className="page lv-flip-page">
            <section className="lv-book-page lv-book-page--portrait">
              <header className="lv-book-heading-block lv-book-heading-block--center">
                <p className="lv-book-section-title">ПОРТРЕТ</p>
                <h2 className="lv-book-subtitle">ФИЛОСОФСКИЙ ЛИК</h2>
              </header>

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
          </article>

          {/* ================== СТРАНИЦА 3 ================== */}
          <article className="page lv-flip-page">
            <section className="lv-book-page lv-book-page--chapter">
              <header className="lv-book-heading-block lv-book-heading-block--center">
                <p className="lv-book-section-title">ГЛАВА I</p>
                <h2 className="lv-book-subtitle">О ХАРАКТЕРЕ</h2>
              </header>

              <div className="lv-book-body">
                <p>
                  Здесь начнётся философский текст о человеке: его силе,
                  слабостях, страхах и надеждах. Каждая следующая страница —
                  новое измерение личности.
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
};

export default BookLayout;
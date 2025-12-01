import React from "react";

export const BookLayout: React.FC = () => {
  return (
    <main className="lv-site-main">
      <div className="lv-book-root">
        <div className="lv-book-layout">
          {/* Тень под книгой */}
          <div className="lv-book-shadow" />

          {/* Левая страница — показывается только на десктопе */}
          <section className="lv-book-page lv-book-page-left lv-desktop-only">
            <div className="lv-book-heading">LIBER VITAE</div>
            <div className="lv-book-subheading">MANUSCRIPT XVII</div>

            <div className="lv-book-body">
              <span className="lv-dropcap">A</span>
              ut viam inveniam aut faciam. Пусть эти строки будут написаны
              светом, размышлениями и памятью — это след пера, оставленный на
              бумаге времени.
            </div>
          </section>

          {/* Правая страница — видна везде (телефон, планшет, десктоп) */}
          <section className="lv-book-page lv-book-page-right">
            <div className="lv-book-portrait-frame">
              <div className="lv-book-portrait-inner">Портрет скоро появится</div>
            </div>

            <div className="lv-book-portrait-caption">
              Философский лик, запечатлённый в вечности.
            </div>

            <div className="lv-wax-button-row">
              <button
                type="button"
                className="lv-wax-button"
                aria-label="Сохранить этот том в архив"
              >
                <div className="lv-wax-button-circle" />
                <div className="lv-wax-button-label">Сохранить в архив</div>
              </button>

              <button
                type="button"
                className="lv-wax-button"
                aria-label="Начать новый том"
              >
                <div className="lv-wax-button-circle" />
                <div className="lv-wax-button-label">Начать новый том</div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
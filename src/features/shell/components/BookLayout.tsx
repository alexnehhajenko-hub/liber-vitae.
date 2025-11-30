import React from "react";

export const BookLayout: React.FC = () => {
  return (
    <div className="lv-site-main">
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />

        {/* Левая страница */}
        <div className="lv-book-page">
          <div className="lv-book-heading">LIBER VITAE</div>
          <div className="lv-book-subheading">MANUSCRIPT XVII</div>
          <div className="lv-book-body">
            <span className="lv-dropcap">A</span>
            ut viam inveniam aut faciam. Пусть эти строки будут написаны светом,
            размышлениями и памятью — это след пера, оставленный на бумаге времени.
          </div>
        </div>

        {/* Правая страница */}
        <div className="lv-book-page">
          <div className="lv-book-portrait-frame">
            <div className="lv-book-portrait-placeholder">
              Портрет скоро появится
            </div>
          </div>
          <div className="lv-book-portrait-caption">
            Философский лик, запечатлённый в вечности.
          </div>

          <div className="lv-wax-button-row">
            <button className="lv-wax-button">Сохранить в архив</button>
            <button className="lv-wax-button">Начать новый том</button>
          </div>
        </div>
      </div>
    </div>
  );
};
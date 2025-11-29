import React from "react";

export const BookLayout: React.FC = () => {
  return (
    <div className="lv-site-main">
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />
        {/* Левая страница */}
        <div className="lv-book-page">
          <div className="lv-book-heading">LIBER VITAE:</div>
          <div className="lv-book-subheading">ALEXEI</div>
          <div className="lv-book-body">
            <span className="lv-dropcap">A</span>
            ut viam inveniam aut faciam. Пусть страницы моей жизни будут
            написаны светом, размышлениями и тишиной, где каждый выбор —
            это след пера, оставленный на бумаге бытия.
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
            Философский лик, запечатлённый в вечности
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
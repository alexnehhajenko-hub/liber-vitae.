import React from "react";

export const BookLayout: React.FC = () => {
  return (
    <div className="lv-site-main">
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />

        {/* Левая страница */}
        <div className="lv-book-page">
          <div className="lv-book-heading">Liber Vitae</div>
          <div className="lv-book-subheading">Manuscript XVII</div>
          <div className="lv-book-body">
            <span className="lv-dropcap">A</span>
            ut viam inveniam aut faciam. Пусть эти строки будут написаны светом,
            размышлениями и памятью — это след пера, оставленный на бумаге
            времени.
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
            Философский лик, запечатлённый в свете.
          </div>
        </div>

        {/* Кнопки */}
        <div className="lv-wax-button-row">
          <button className="lv-wax-button">Следующая страница</button>
          <button className="lv-wax-button">Вернуться</button>
        </div>
      </div>
    </div>
  );
};
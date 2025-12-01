import React from "react";

export const BookLayout: React.FC = () => {
  return (
    <main className="lv-book-main">
      <div className="lv-book-wrapper">
        <div className="lv-book-cover-shadow" />

        <div className="lv-book-spread">
          {/* Левая страница – текст */}
          <article className="lv-book-page lv-book-page-left">
            <header className="lv-book-header">
              <p className="lv-book-series">LIBER VITAE</p>
              <h1 className="lv-book-manuscript">MANUSCRIPT XVII</h1>
            </header>

            <p className="lv-book-dropcap">
              <span className="lv-dropcap-letter">A</span>
              <span className="lv-dropcap-text">
                ut viam inveniam aut faciam. Пусть эти строки будут написаны
                светом, размышлениями и памятью — это след пера, оставленный на
                бумаге времени.
              </span>
            </p>

            <p className="lv-book-paragraph">
              Каждый том Liber Vitae — это небольшая философская исповедь о
              человеческой жизни, характере и судьбе. Здесь будут собраны
              мысли, которые ты доверишь нашему манускрипту.
            </p>
          </article>

          {/* Правая страница – портрет и кнопки
              На мобильных ЭТА СТРАНИЦА СКРЫВАЕТСЯ, остаётся только одна. */}
          <article
            className="lv-book-page lv-book-page-right"
            aria-hidden="true"
          >
            <div className="lv-portrait-block">
              <div className="lv-portrait-frame">
                <div className="lv-portrait-inner">Портрет скоро появится</div>
              </div>
              <p className="lv-portrait-caption">
                Философский лик, запечатлённый в вечности.
              </p>
            </div>

            <div className="lv-book-buttons">
              <button className="lv-book-button lv-book-button-primary">
                СОХРАНИТЬ В АРХИВ
              </button>
              <button className="lv-book-button lv-book-button-ghost">
                НАЧАТЬ НОВЫЙ ТОМ
              </button>
            </div>
          </article>
        </div>
      </div>

      {/* Стили только для этой раскладки (styled-jsx, работает в Next.js) */}
      <style jsx>{`
        .lv-book-main {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px 12px;
          background: radial-gradient(
              circle at top,
              #4a2a18 0,
              #1a0e08 55%,
              #080404 100%
            );
          color: #3a1f14;
        }

        .lv-book-wrapper {
          position: relative;
          width: 100%;
          max-width: 1120px;
          padding: 16px;
        }

        .lv-book-cover-shadow {
          position: absolute;
          inset: 0;
          border-radius: 40px;
          background: radial-gradient(
            circle at top,
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.95)
          );
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8);
          z-index: 0;
        }

        .lv-book-spread {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #2d160d;
          border-radius: 34px;
          padding: 28px 32px;
          gap: 0;
          box-shadow:
            0 18px 35px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(0, 0, 0, 0.6);
        }

        .lv-book-page {
          background: radial-gradient(
              circle at top left,
              #f8e2bb 0,
              #f1d2a0 40%,
              #eac696 100%
            );
          border-radius: 26px;
          padding: 36px 32px 40px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -12px 25px rgba(181, 126, 71, 0.55);
        }

        .lv-book-page-left {
          margin-right: 18px;
          position: relative;
        }

        .lv-book-page-right {
          margin-left: 18px;
          position: relative;
        }

        /* Имитация корешка */
        .lv-book-page-left::after,
        .lv-book-page-right::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 18px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.05),
            rgba(255, 255, 255, 0.4)
          );
          pointer-events: none;
        }

        .lv-book-page-left::after {
          right: -18px;
          border-radius: 0 26px 26px 0;
        }

        .lv-book-page-right::before {
          left: -18px;
          border-radius: 26px 0 0 26px;
        }

        /* Заголовки */
        .lv-book-header {
          text-align: center;
          margin-bottom: 32px;
          letter-spacing: 0.08em;
        }

        .lv-book-series {
          font-family: "Times New Roman", "Georgia", serif;
          font-size: 12px;
          text-transform: uppercase;
          color: #a0703b;
          margin-bottom: 6px;
        }

        .lv-book-manuscript {
          font-family: "Times New Roman", "Georgia", serif;
          font-size: 22px;
          line-height: 1.2;
          text-transform: uppercase;
          color: #5c3720;
        }

        /* Основной текст с буквицей */
        .lv-book-dropcap {
          display: flex;
          margin-bottom: 18px;
          font-size: 16px;
          line-height: 1.55;
          color: #5a341e;
        }

        .lv-dropcap-letter {
          font-family: "Times New Roman", "Georgia", serif;
          font-size: 50px;
          line-height: 0.9;
          margin-right: 10px;
          padding: 6px 10px;
          border-radius: 6px;
          background: linear-gradient(135deg, #c58940, #8b4513);
          color: #f9eed7;
          box-shadow:
            0 3px 6px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .lv-dropcap-text {
          flex: 1;
        }

        .lv-book-paragraph {
          font-size: 15px;
          line-height: 1.6;
          color: #684026;
          text-indent: 1.2em;
        }

        /* Блок портрета */
        .lv-portrait-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }

        .lv-portrait-frame {
          width: 100%;
          max-width: 360px;
          background: #1b100a;
          border-radius: 28px;
          padding: 10px;
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.65),
            0 0 0 1px rgba(255, 215, 160, 0.4);
        }

        .lv-portrait-inner {
          border-radius: 22px;
          padding: 42px 24px;
          background: radial-gradient(circle at top, #2b1a12, #050303);
          color: #f3d7a8;
          text-align: center;
          font-size: 18px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lv-portrait-caption {
          margin-top: 14px;
          font-size: 14px;
          color: #6d4122;
          text-align: center;
        }

        /* Кнопки */
        .lv-book-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .lv-book-button {
          width: 100%;
          max-width: 260px;
          padding: 13px 22px;
          border-radius: 999px;
          border: none;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease,
            background 0.15s ease, color 0.15s ease;
        }

        .lv-book-button-primary {
          background: radial-gradient(circle at top, #ffcc70, #c47135);
          color: #3a1908;
          box-shadow:
            0 12px 20px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .lv-book-button-primary:hover {
          transform: translateY(-1px);
          box-shadow:
            0 16px 26px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .lv-book-button-ghost {
          background: rgba(0, 0, 0, 0.04);
          color: #7d4b25;
          box-shadow: inset 0 0 0 1px rgba(156, 98, 52, 0.7);
        }

        .lv-book-button-ghost:hover {
          background: rgba(125, 75, 37, 0.08);
        }

        /* ─────────────────────────────────────────
           Адаптив: телефон / маленький планшет
           ───────────────────────────────────────── */

        @media (max-width: 768px) {
          .lv-book-main {
            padding: 20px 8px;
          }

          .lv-book-wrapper {
            max-width: 420px;
            margin: 0 auto;
            padding: 0;
          }

          .lv-book-cover-shadow {
            border-radius: 32px;
          }

          .lv-book-spread {
            padding: 16px;
            grid-template-columns: 1fr; /* только одна колонка */
          }

          /* ПРАВАЯ страница – скрываем на телефоне: один лист, как ты хочешь */
          .lv-book-page-right {
            display: none;
          }

          .lv-book-page-left {
            margin-right: 0;
          }

          .lv-book-page-left::after,
          .lv-book-page-right::before {
            display: none; /* на телефоне убираем корешок-перегиб */
          }

          .lv-book-page {
            padding: 28px 22px 32px;
            border-radius: 26px;
          }

          .lv-book-manuscript {
            font-size: 18px;
          }

          .lv-book-dropcap {
            font-size: 15px;
          }

          .lv-dropcap-letter {
            font-size: 44px;
          }
        }

        /* Очень широкие экраны – немного увеличим книгу */
        @media (min-width: 1280px) {
          .lv-book-spread {
            max-width: 1180px;
          }
        }
      `}</style>
    </main>
  );
};

export default BookLayout;
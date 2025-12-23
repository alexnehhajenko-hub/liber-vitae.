import React from 'react';

type ManuscriptPageProps = {
  index: number;
  total: number;
  onSave?: () => void;
  onStartNew?: () => void;
};

export const ManuscriptPage: React.FC<ManuscriptPageProps> = ({
  index,
  total,
  onSave,
  onStartNew,
}) => {
  // Блокируем события, чтобы FlipBook не воспринимал тап как перелистывание
  const stopFlip = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <article className="lv-page">
      <header className="lv-page-header">
        <div className="lv-page-subtitle">LIBER VITAE</div>
        <h1 className="lv-page-title">MANUSCRIPT XVII</h1>
      </header>

      <p className="lv-page-body">
        Aut viam inveniam aut faciam. Пусть эти строки будут написаны светом,
        размышлениями и памятью — это след пера, оставленный на бумаге
        времени.
      </p>

      <div className="lv-page-portrait-block">
        <div className="lv-page-portrait-label">Портрет скоро появится</div>
        <p className="lv-page-portrait-caption">
          Философский лик, запечатлённый в вечности.
        </p>
      </div>

      <div
        className="lv-page-actions"
        // Перекрываем и pointer/touch/mouse, чтобы на iPhone тоже не “листал”
        onPointerDown={stopFlip}
        onTouchStart={stopFlip}
        onMouseDown={stopFlip}
        onClick={stopFlip}
      >
        <button
          className="lv-page-btn lv-page-btn--primary"
          type="button"
          onPointerDown={stopFlip}
          onTouchStart={stopFlip}
          onMouseDown={stopFlip}
          onClick={(e) => {
            stopFlip(e);
            onSave?.();
          }}
        >
          СОХРАНИТЬ В АРХИВ
        </button>

        <button
          className="lv-page-btn lv-page-btn--secondary"
          type="button"
          onPointerDown={stopFlip}
          onTouchStart={stopFlip}
          onMouseDown={stopFlip}
          onClick={(e) => {
            stopFlip(e);
            onStartNew?.();
          }}
        >
          НАЧАТЬ НОВЫЙ ТОМ
        </button>
      </div>

      <footer className="lv-page-footer">
        <span>
          Лист {index + 1} из {total}
        </span>
      </footer>
    </article>
  );
};
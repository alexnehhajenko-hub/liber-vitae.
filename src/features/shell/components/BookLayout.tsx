'use client';

import React from 'react';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const [current, setCurrent] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768); // телефон
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const canPrev = current > 0;
  const canNext = current < pages.length - 1;

  const handlePrev = () => {
    if (canPrev) setCurrent((c) => c - 1);
  };

  const handleNext = () => {
    if (canNext) setCurrent((c) => c + 1);
  };

  return (
    <div className="lv-book-shell">
      <div
        className={
          'lv-book-viewport ' +
          (isMobile ? 'lv-book-viewport--single' : 'lv-book-viewport--spread')
        }
      >
        {isMobile ? (
          // Телефон: один лист
          <div className="lv-book-page-wrapper">
            {pages[current]}
          </div>
        ) : (
          // Планшет / десктоп: разворот
          <>
            <div className="lv-book-page-wrapper">
              {pages[current - 1] ?? <div style={{ visibility: 'hidden' }} />}
            </div>
            <div className="lv-book-page-wrapper">
              {pages[current]}
            </div>
            <div className="lv-book-spine" />
          </>
        )}
      </div>

      <div className="lv-book-controls">
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={!canPrev}
        >
          ← Назад
        </button>
        <span className="lv-book-counter">
          Страница {current + 1} / {pages.length}
        </span>
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handleNext}
          disabled={!canNext}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
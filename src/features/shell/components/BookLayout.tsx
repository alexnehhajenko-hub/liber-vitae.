'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы (0, 1, 2, ...)
};

// Динамический импорт, чтобы не ломать SSR
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default || mod),
  { ssr: false }
) as any;

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  // Текущая страница (0,1,2,3)
  const [pageIndex, setPageIndex] = React.useState(0);

  const total = pages.length;

  // Кнопка «Назад»
  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Кнопка «Вперёд»
  const handleNext = () => {
    setPageIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  };

  // Свайп внутри книги — библиотека сама листает,
  // а мы просто синхронизируем номер страницы.
  const handleFlip = (e: FlipEvent) => {
    if (typeof e?.data === 'number') {
      setPageIndex(e.data);
    }
  };

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          key={pageIndex}          // при смене страницы пересоздаём компонент
          startPage={pageIndex}    // с нужной стартовой страницей
          width={480}
          height={640}
          size="stretch"
          minWidth={320}
          maxWidth={900}
          minHeight={480}
          maxHeight={1000}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait={true}
          mobileScrollSupport={false}
          className="lv-flip-book"
          onFlip={handleFlip}
        >
          {pages.map((page, index) => (
            <div key={index} className="lv-flip-page">
              {page}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="lv-book-controls">
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={pageIndex <= 0}
        >
          ← Назад
        </button>

        <span className="lv-book-counter">
          Страница {pageIndex + 1} / {total}
        </span>

        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handleNext}
          disabled={pageIndex >= total - 1}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
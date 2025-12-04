'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы
};

// Динамический импорт, чтобы не ломать SSR в Next.js
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);

  const total = pages.length;

  const handlePrev = () => {
    if (!bookRef.current) return;

    const api = bookRef.current.pageFlip?.();
    if (!api) return;

    api.flipPrev(); // листаем НАЗАД
  };

  const handleNext = () => {
    if (!bookRef.current) return;

    const api = bookRef.current.pageFlip?.();
    if (!api) return;

    api.flipNext(); // листаем ВПЕРЁД
  };

  const handleFlip = (e: FlipEvent) => {
    setCurrent(e.data);
  };

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          // базовый размер книги (дальше она подстраивается под ширину контейнера)
          width={520}
          height={780}
          size="stretch"
          minWidth={320}
          maxWidth={900}
          minHeight={480}
          maxHeight={1200}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait={true}          // на телефоне одна страница
          mobileScrollSupport={true}  // вертикальный скролл страницы остаётся
          className="lv-flip-book"
          ref={bookRef}
          onFlip={handleFlip}
        >
          {pages.map((page, index) => (
            <div key={index} className="lv-flip-page">
              {page}
            </div>
          ))}
        </HTMLFlipBook>

        {/* Невидимые «горячие зоны» по краям книги */}
        <button
          type="button"
          className="lv-book-hotspot lv-book-hotspot--left"
          onClick={handlePrev}
          aria-label="Листать назад"
        />
        <button
          type="button"
          className="lv-book-hotspot lv-book-hotspot--right"
          onClick={handleNext}
          aria-label="Листать вперёд"
        />
      </div>

      <div className="lv-book-controls">
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={current <= 0}
        >
          ← Назад
        </button>

        <span className="lv-book-counter">
          Страница {current + 1} / {total}
        </span>

        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handleNext}
          disabled={current >= total - 1}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
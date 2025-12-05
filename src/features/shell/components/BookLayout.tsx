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

  const getApi = () => {
    if (!bookRef.current) return null;
    return bookRef.current.pageFlip?.();
  };

  const handlePrev = () => {
    const api = getApi();
    if (!api) return;
    api.flipPrev();
  };

  const handleNext = () => {
    const api = getApi();
    if (!api) return;
    api.flipNext();
  };

  const handleFlip = (e: FlipEvent) => {
    setCurrent(e.data);
  };

  return (
    <div className="lv-book-shell">
      <div
        className="lv-book-flip-wrapper"
        // Блокируем всплытие, чтобы уменьшить шанс срабатывания жеста "Назад"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <HTMLFlipBook
          // Чуть уже и повыше: удобнее для вертикального центрирования
          width={360}
          height={760}
          size="stretch"
          minWidth={300}
          maxWidth={900}
          minHeight={480}
          maxHeight={1200}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait={true}
          mobileScrollSupport={true}
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

        {/* Невидимые кликабельные зоны по краям КНИГИ, а не экрана */}
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
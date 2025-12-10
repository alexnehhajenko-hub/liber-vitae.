'use client';

import React, { useEffect, useRef, useState } from 'react';

export type BookLayoutProps = {
  pages: React.ReactNode[];
};

/**
 * BookLayout
 * - раскрытая книга: левая + правая страница
 * - перелистывание:
 *   • кнопки «Назад / Вперёд»
 *   • свайп (тач/мышь)
 *   • стрелки ← / → на клавиатуре
 */
export function BookLayout({ pages }: BookLayoutProps) {
  const [spreadIndex, setSpreadIndex] = useState(0);

  const totalPages = pages.length;
  const totalSpreads = Math.max(1, Math.ceil(totalPages / 2));

  const goPrev = () => {
    setSpreadIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setSpreadIndex((prev) => Math.min(prev + 1, totalSpreads - 1));
  };

  // --- расчёт текущих страниц ---
  const leftIndex = spreadIndex * 2;
  const rightIndex = leftIndex + 1;

  const leftPage = pages[leftIndex] ?? null;
  const rightPage = pages[rightIndex] ?? null;

  const currentPageNumber = Math.min(leftIndex + 1, totalPages);

  // --- свайпы (тач + мышь) ---
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);

  const startDrag = (clientX: number) => {
    dragStartX.current = clientX;
    dragging.current = true;
  };

  const endDrag = (clientX: number) => {
    if (!dragging.current || dragStartX.current == null) {
      dragging.current = false;
      dragStartX.current = null;
      return;
    }

    const dx = clientX - dragStartX.current;
    const threshold = 40;

    if (Math.abs(dx) > threshold) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    dragging.current = false;
    dragStartX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches.length === 0) return;
    endDrag(e.changedTouches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    startDrag(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    endDrag(e.clientX);
  };

  // --- стрелки на клавиатуре ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handler);
      return () => {
        window.removeEventListener('keydown', handler);
      };
    }
  }, [totalSpreads, totalPages]);

  return (
    <div className="lv-book-layout">
      <div className="lv-book-shadow" />

      <div
        className="lv-book-open"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* ВАЖНО: убираем любые трансформации с контейнеров страниц,
           чтобы iOS спокойно показывал клавиатуру */}
        <div
          className="lv-book-open-page lv-book-open-page--left"
          style={{ transform: 'none' }}
        >
          {leftPage}
        </div>

        <div
          className="lv-book-open-page lv-book-open-page--right"
          style={{ transform: 'none' }}
        >
          {rightPage}
        </div>

        <div className="lv-book-open-spine" />
      </div>

      {/* Навигация под книгой */}
      <div
        className="lv-book-nav"
        style={{
          marginTop: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          fontSize: '0.85rem',
          letterSpacing: '0.04em',
          opacity: 0.9,
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={spreadIndex === 0}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: spreadIndex === 0 ? 'default' : 'pointer',
            opacity: spreadIndex === 0 ? 0.35 : 0.9,
          }}
        >
          ← Назад
        </button>

        <span>
          Страница {currentPageNumber} / {totalPages}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={spreadIndex === totalSpreads - 1}
          style={{
            border: 'none',
            background: 'transparent',
            cursor:
              spreadIndex === totalSpreads - 1 ? 'default' : 'pointer',
            opacity: spreadIndex === totalSpreads - 1 ? 0.35 : 0.9,
          }}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
}

export default BookLayout;
'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы из библиотеки
};

// Динамический импорт – чтобы всё работало в Next.js без SSR
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const total = pages.length;

  const safePageFlip = () => {
    if (!bookRef.current) return null;
    const api = bookRef.current.pageFlip?.();
    return api ?? null;
  };

  // Назад: если мы на первой – прыгаем на последнюю
  const handlePrev = () => {
    const api = safePageFlip();
    if (!api || total === 0) return;

    const currentIndex = api.getCurrentPageIndex();
    if (currentIndex <= 0) {
      api.flip(total - 1, 'bottom');
    } else {
      api.flipPrev('bottom');
    }
  };

  // Вперёд: если мы на последней – прыгаем на первую
  const handleNext = () => {
    const api = safePageFlip();
    if (!api || total === 0) return;

    const currentIndex = api.getCurrentPageIndex();
    const lastIndex = total - 1;

    if (currentIndex >= lastIndex) {
      api.flip(0, 'bottom');
    } else {
      api.flipNext('bottom');
    }
  };

  const handleFlip = (e: FlipEvent) => {
    setCurrent(e.data);
  };

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          // делаем книгу крупнее и выше
          width={620}
          height={880}
          size="stretch"
          minWidth={360}
          maxWidth={1000}
          minHeight={520}
          maxHeight={1200}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait={true}        // на телефоне – одна страница
          mobileScrollSupport={false}
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
      </div>

      <div className="lv-book-controls">
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
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
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
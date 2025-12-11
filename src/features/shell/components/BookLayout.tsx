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
  const bookRef = React.useRef<any>(null);
  const [current, setCurrent] = React.useState(0);

  const total = pages.length;

  // Надёжно достаём PageFlip-API из ref
  const getPageFlip = React.useCallback(() => {
    const inst = bookRef.current;
    if (!inst) return null;

    if (typeof inst.pageFlip === 'function') {
      return inst.pageFlip();
    }
    if (typeof inst.getPageFlip === 'function') {
      return inst.getPageFlip();
    }

    return null;
  }, []);

  const handlePrev = () => {
    const api = getPageFlip();
    if (!api) return;
    // без анимации можно turnToPrevPage, с анимацией flipPrev
    api.turnToPrevPage?.() ?? api.flipPrev?.('bottom');
  };

  const handleNext = () => {
    const api = getPageFlip();
    if (!api) return;
    api.turnToNextPage?.() ?? api.flipNext?.('bottom');
  };

  const handleFlip = (e: FlipEvent) => {
    // react-pageflip в e.data отдаёт индекс страницы
    setCurrent(e.data);
  };

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
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
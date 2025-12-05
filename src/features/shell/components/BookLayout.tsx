'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы
};

// Динамический импорт, чтобы не ломать SSR
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);
  const [current, setCurrent] = React.useState(0);

  const total = pages.length;

  const handlePrev = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipPrev();
  };

  const handleNext = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipNext();
  };

  const handleFlip = (e: FlipEvent) => {
    setCurrent(e.data);
  };

  // Блокировка горизонтального скролла страницы во время свайпа по книге
  const lockHorizontalSwipe = React.useCallback((lock: boolean) => {
    if (typeof document === 'undefined') return;
    const body = document.body;

    if (lock) {
      // Разрешаем только вертикальную прокрутку
      (body.style as any).overscrollBehaviorX = 'none';
      (body.style as any).touchAction = 'pan-y';
    } else {
      (body.style as any).overscrollBehaviorX = '';
      (body.style as any).touchAction = '';
    }
  }, []);

  const handleTouchStart = () => {
    lockHorizontalSwipe(true);
  };

  const handleTouchEnd = () => {
    lockHorizontalSwipe(false);
  };

  React.useEffect(() => {
    // На случай размонтирования компонента
    return () => {
      lockHorizontalSwipe(false);
    };
  }, [lockHorizontalSwipe]);

  return (
    <div
      className="lv-book-shell"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          // Чуть более компактный, чтобы книга полностью была видна по высоте
          width={480}
          height={640}
          size="stretch"
          minWidth={320}
          maxWidth={900}
          minHeight={480}
          maxHeight={1000}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait={true} // на телефоне одна страница, на широком — разворот
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
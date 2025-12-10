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

  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);
  const swipeLocked = React.useRef(false);

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

  // Блокировка горизонтального скролла страницы (через css на body)
  const lockHorizontalSwipe = React.useCallback((lock: boolean) => {
    if (typeof document === 'undefined') return;
    const body = document.body;

    if (lock) {
      (body.style as any).overscrollBehaviorX = 'none';
      (body.style as any).touchAction = 'pan-y';
    } else {
      (body.style as any).overscrollBehaviorX = '';
      (body.style as any).touchAction = '';
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];

    // Если тач начался на input/textarea/кнопке — не трогаем его вообще,
    // даём iOS спокойно открыть клавиатуру / нажать кнопку.
    const target = e.target as HTMLElement;
    if (target.closest('textarea, input, button, [data-no-swipe]')) {
      swipeLocked.current = false;
      return;
    }

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    swipeLocked.current = true;
    lockHorizontalSwipe(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeLocked.current) return;

    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX.current);
    const dy = Math.abs(touch.clientY - touchStartY.current);

    // Если жест пошёл вертикально — разблокируем, чтобы можно было прокрутить страницу
    if (dy > dx) {
      swipeLocked.current = false;
      lockHorizontalSwipe(false);
    }
    // НИЧЕГО не preventDefault'им — flipbook сам обработает свайп.
  };

  const handleTouchEnd = () => {
    if (!swipeLocked.current) return;
    swipeLocked.current = false;
    lockHorizontalSwipe(false);
  };

  React.useEffect(() => {
    return () => {
      // На случай размонтирования компонента
      lockHorizontalSwipe(false);
    };
  }, [lockHorizontalSwipe]);

  return (
    <div
      className="lv-book-shell"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
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
          mobileScrollSupport={true} // ставим дефолт, как в документации
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
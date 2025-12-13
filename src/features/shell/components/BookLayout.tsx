'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
  // если понадобится в будущем — можно добавить slugKey
};

type FlipEvent = {
  data: number; // индекс текущей страницы
};

// Динамический импорт, чтобы не ломать SSR
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

const STORAGE_KEY = 'lv_last_page_book';

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);
  const [current, setCurrent] = React.useState(0);

  const total = pages.length;

  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);

  const handlePrev = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipPrev();
  };

  const handleNext = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipNext();
  };

  const handleFlip = (e: FlipEvent) => {
    const idx = typeof e?.data === 'number' ? e.data : 0;
    setCurrent(idx);

    // сохраняем страницу
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, String(idx));
      }
    } catch {
      // ignore
    }
  };

  // Блокировка горизонтального скролла страницы во время свайпа по книге
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
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    lockHorizontalSwipe(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX.current);
    const dy = Math.abs(touch.clientY - touchStartY.current);

    // Если жест в основном горизонтальный — запрещаем действие браузера
    if (dx > dy) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    lockHorizontalSwipe(false);
  };

  // ✅ Восстановление страницы при заходе
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let saved = 0;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const n = raw ? Number(raw) : 0;
      if (Number.isFinite(n)) saved = n;
    } catch {
      saved = 0;
    }

    saved = Math.max(0, Math.min(saved, Math.max(0, total - 1)));

    // важно: подождать, пока flipbook реально инициализируется
    // делаем несколько попыток, но мягко и без бесконечного цикла
    let tries = 0;
    const maxTries = 20;

    const tick = () => {
      tries += 1;

      const inst = bookRef.current?.pageFlip?.();
      if (inst && typeof inst.flip === 'function') {
        try {
          inst.flip(saved);
          setCurrent(saved);
          return;
        } catch {
          // если flip ещё не готов — пробуем дальше
        }
      }

      if (tries < maxTries) {
        window.setTimeout(tick, 80);
      }
    };

    window.setTimeout(tick, 120);

    return () => {
      lockHorizontalSwipe(false);
    };
  }, [total, lockHorizontalSwipe]);

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
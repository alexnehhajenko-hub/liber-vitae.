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

const STORAGE_KEY = 'lv_last_page_book';

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);
  const flipApiRef = React.useRef<any>(null);

  const [current, setCurrent] = React.useState(0);
  const total = pages.length;

  const safeFlipTo = React.useCallback((index: number) => {
    const api = flipApiRef.current;
    if (!api) return;
    try {
      api.flip(index);
    } catch {}
  }, []);

  const handlePrev = React.useCallback(() => {
    const api = flipApiRef.current;
    if (!api) return;
    try {
      api.flipPrev();
    } catch {}
  }, []);

  const handleNext = React.useCallback(() => {
    const api = flipApiRef.current;
    if (!api) return;
    try {
      api.flipNext();
    } catch {}
  }, []);

  const handleFlip = React.useCallback((e: FlipEvent) => {
    const idx = e?.data ?? 0;
    setCurrent(idx);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(idx));
    } catch {}
  }, []);

  const handleInit = React.useCallback(
    (e: any) => {
      try {
        flipApiRef.current = e?.pageFlip?.() ?? null;
      } catch {
        flipApiRef.current = null;
      }

      // fallback
      try {
        if (!flipApiRef.current && bookRef.current?.pageFlip) {
          flipApiRef.current = bookRef.current.pageFlip();
        }
      } catch {}

      // restore last page
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const idx = raw ? Number(raw) : 0;
        const safe = Number.isFinite(idx)
          ? Math.max(0, Math.min(idx, total - 1))
          : 0;

        requestAnimationFrame(() => safeFlipTo(safe));
        setCurrent(safe);
      } catch {}
    },
    [safeFlipTo, total]
  );

  // reset from outside
  React.useEffect(() => {
    const onReset = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, '0');
      } catch {}
      setCurrent(0);
      requestAnimationFrame(() => safeFlipTo(0));
    };

    window.addEventListener('lv:resetBook', onReset as any);
    return () => window.removeEventListener('lv:resetBook', onReset as any);
  }, [safeFlipTo]);

  // ---- touch handling only on the clickable book area ----
  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);

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
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    lockHorizontalSwipe(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchStartX.current);
    const dy = Math.abs(t.clientY - touchStartY.current);

    if (dx > dy) e.preventDefault();
  };

  const handleTouchEnd = () => lockHorizontalSwipe(false);

  React.useEffect(() => {
    return () => lockHorizontalSwipe(false);
  }, [lockHorizontalSwipe]);

  return (
    // ✅ IMPORTANT: this wrapper does NOT catch taps -> header buttons work
    <div
      className="lv-book-shell"
      style={{
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // ✅ move book higher (not centered)
        paddingTop: 10, // ✅ small offset from top
        overflow: 'hidden',
        pointerEvents: 'none', // ✅ do not block header buttons
      }}
    >
      {/* ✅ Only the book area is clickable */}
      <div
        className="lv-book-flip-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 auto',
          pointerEvents: 'auto', // ✅ clickable
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
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
          mobileScrollSupport={true}
          className="lv-flip-book"
          ref={bookRef}
          onFlip={handleFlip}
          onInit={handleInit}
        >
          {pages.map((page, index) => (
            <div key={index} className="lv-flip-page">
              {page}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* ✅ Bottom controls clickable */}
      <div
        className="lv-book-controls"
        style={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          paddingBottom: 10,
          flex: '0 0 auto',
          pointerEvents: 'auto', // ✅ clickable
        }}
      >
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={current <= 0}
        >
          ← Назад
        </button>

        <span className="lv-book-counter">
          Страница {Math.min(current + 1, total)} / {total}
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
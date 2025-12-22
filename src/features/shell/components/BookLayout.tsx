'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number;
};

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

const STORAGE_KEY = 'lv_last_page_book';
const HEADER_SAFE_TOP = 56; // высота шапки, чтобы книгу поднять и не перекрывать

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

  const handleInit = React.useCallback((e: any) => {
    try {
      flipApiRef.current = e?.pageFlip?.() ?? null;
    } catch {
      flipApiRef.current = null;
    }

    try {
      if (!flipApiRef.current && bookRef.current?.pageFlip) {
        flipApiRef.current = bookRef.current.pageFlip();
      }
    } catch {}

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const idx = raw ? Number(raw) : 0;
      const safe = Number.isFinite(idx) ? Math.max(0, Math.min(idx, total - 1)) : 0;
      requestAnimationFrame(() => safeFlipTo(safe));
      setCurrent(safe);
    } catch {}
  }, [safeFlipTo, total]);

  // reset event (если где-то используете)
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

  // IMPORTANT: wrapper doesn't block header clicks
  return (
    <div
      className="lv-book-shell"
      style={{
        height: '100svh',
        overflow: 'hidden',
        pointerEvents: 'none', // не перекрываем шапку
        paddingTop: HEADER_SAFE_TOP, // книга чуть выше/под шапкой
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <div
        className="lv-book-flip-wrapper"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 auto',
        }}
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

      <div
        className="lv-book-controls"
        style={{
          pointerEvents: 'auto',
          marginTop: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          paddingBottom: 10,
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
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы
};

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

const STORAGE_KEY = 'lv_last_page_book';
const HEADER_SAFE_TOP = 56; // чтобы книга не залезала под шапку

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);
  const [current, setCurrent] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const total = pages.length;

  const getFlip = React.useCallback(() => {
    try {
      const inst = bookRef.current;
      if (!inst) return null;
      if (typeof inst.pageFlip === 'function') return inst.pageFlip();
      return null;
    } catch {
      return null;
    }
  }, []);

  const flipTo = React.useCallback((index: number) => {
    const api = getFlip();
    if (!api) return false;
    try {
      api.flip(index);
      return true;
    } catch {
      return false;
    }
  }, [getFlip]);

  const handlePrev = React.useCallback(() => {
    const api = getFlip();
    if (!api) return;
    try {
      api.flipPrev();
    } catch {}
  }, [getFlip]);

  const handleNext = React.useCallback(() => {
    const api = getFlip();
    if (!api) return;
    try {
      api.flipNext();
    } catch {}
  }, [getFlip]);

  const handleFlip = React.useCallback((e: FlipEvent) => {
    const idx = e?.data ?? 0;
    setCurrent(idx);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(idx));
    } catch {}
  }, []);

  // Надёжная инициализация: ждём, пока ref реально появится
  React.useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const init = () => {
      if (cancelled) return;

      const api = getFlip();
      if (api) {
        setReady(true);

        // восстановить страницу
        let saved = 0;
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          const n = raw ? Number(raw) : 0;
          saved = Number.isFinite(n) ? n : 0;
        } catch {}

        const safe = Math.max(0, Math.min(saved, total - 1));
        setCurrent(safe);

        // flip после готовности (2 кадра — стабильно на мобиле)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            flipTo(safe);
          });
        });

        return;
      }

      tries += 1;
      if (tries < 40) {
        setTimeout(init, 50);
      } else {
        setReady(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [getFlip, flipTo, total]);

  return (
    <div
      className="lv-book-shell"
      style={{
        height: '100svh',
        overflow: 'hidden',
        paddingTop: HEADER_SAFE_TOP,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <div
        className="lv-book-flip-wrapper"
        style={{
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
          disabled={!ready || current <= 0}
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
          disabled={!ready || current >= total - 1}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
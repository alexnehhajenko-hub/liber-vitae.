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

  const flipTo = React.useCallback(
    (index: number) => {
      const api = getFlip();
      if (!api) return false;
      try {
        api.flip(index);
        return true;
      } catch {
        return false;
      }
    },
    [getFlip]
  );

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

  // Инициализация + восстановление страницы
  React.useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const init = () => {
      if (cancelled) return;

      const api = getFlip();
      if (api) {
        setReady(true);

        let saved = 0;
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          const n = raw ? Number(raw) : 0;
          saved = Number.isFinite(n) ? n : 0;
        } catch {}

        const safe = Math.max(0, Math.min(saved, total - 1));
        setCurrent(safe);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            flipTo(safe);
          });
        });

        return;
      }

      tries += 1;
      if (tries < 60) setTimeout(init, 50);
      else setReady(false);
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
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="lv-book-flip-wrapper"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <HTMLFlipBook
          width={520}
          height={720}
          size="stretch"
          minWidth={320}
          maxWidth={1200}
          minHeight={480}
          maxHeight={1400}
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

      <div
        className="lv-book-controls"
        style={{
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          padding: '10px 12px calc(10px + env(safe-area-inset-bottom))',
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
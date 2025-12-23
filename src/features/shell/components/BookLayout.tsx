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

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);

  const [current, setCurrent] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  // Пересоздание движка (лечит “прыжок назад” после reset)
  const [flipKey, setFlipKey] = React.useState(1);

  const pendingResetRef = React.useRef(false);
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

  const hardResetToBeginning = React.useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '0');
    } catch {}

    setCurrent(0);
    setReady(false);

    pendingResetRef.current = true;
    setFlipKey((k) => k + 1);
  }, []);

  // Событие из шапки
  React.useEffect(() => {
    const onReset = () => hardResetToBeginning();
    window.addEventListener('lv:resetBook', onReset as any);
    return () => window.removeEventListener('lv:resetBook', onReset as any);
  }, [hardResetToBeginning]);

  // Инициализация / ре-инициализация при flipKey
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

        if (pendingResetRef.current) {
          pendingResetRef.current = false;
          saved = 0;
          try {
            window.localStorage.setItem(STORAGE_KEY, '0');
          } catch {}
        }

        const safe = Math.max(0, Math.min(saved, total - 1));
        setCurrent(safe);

        // стабильный переход после маунта
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            try {
              if (typeof api.turnToPage === 'function') api.turnToPage(safe);
              else api.flip(safe);
            } catch {}
          });
        });

        return;
      }

      tries += 1;
      if (tries < 120) {
        setTimeout(init, 50);
      } else {
        setReady(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [flipKey, getFlip, total]);

  return (
    <div
      className="lv-book-shell"
      style={{
        // ВАЖНО: НЕ 100svh, а 100% — потому что высоту уже задаёт SiteLayout/main
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Зона книги занимает всё доступное место */}
      <div
        className="lv-book-flip-wrapper"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {!ready && (
          <div
            style={{
              position: 'absolute',
              top: '45%',
              transform: 'translateY(-50%)',
              opacity: 0.65,
              fontSize: 14,
            }}
          >
            Загрузка книги…
          </div>
        )}

        <HTMLFlipBook
          key={flipKey}
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

      {/* Кнопки — всегда внизу */}
      <div
        className="lv-book-controls"
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          padding: '10px 0 12px',
          pointerEvents: 'auto',
          zIndex: 20,
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
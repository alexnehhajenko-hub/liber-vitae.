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

  // ключ для принудительного пересоздания flipbook (лечит “прыжок назад”)
  const [flipKey, setFlipKey] = React.useState(1);

  // если reset пришёл до готовности — применим сразу после init
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
    // 1) сохраняем “0”
    try {
      window.localStorage.setItem(STORAGE_KEY, '0');
    } catch {}

    // 2) сбрасываем UI
    setCurrent(0);
    setReady(false);

    // 3) принудительно пересоздаём flipbook (самый надёжный reset)
    pendingResetRef.current = true;
    setFlipKey((k) => k + 1);
  }, []);

  // слушаем reset из шапки
  React.useEffect(() => {
    const onReset = () => hardResetToBeginning();
    window.addEventListener('lv:resetBook', onReset as any);
    return () => window.removeEventListener('lv:resetBook', onReset as any);
  }, [hardResetToBeginning]);

  // инициализация flipbook (каждый раз при flipKey)
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

        // если был reset — гарантированно стартуем с 0
        if (pendingResetRef.current) {
          pendingResetRef.current = false;
          saved = 0;
          try {
            window.localStorage.setItem(STORAGE_KEY, '0');
          } catch {}
        }

        const safe = Math.max(0, Math.min(saved, total - 1));
        setCurrent(safe);

        // стабильно перелистываем после готовности
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            try {
              // у некоторых версий есть turnToPage; если нет — используем flip
              if (typeof api.turnToPage === 'function') api.turnToPage(safe);
              else api.flip(safe);
            } catch {}
          });
        });

        return;
      }

      tries += 1;
      if (tries < 80) {
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
        height: '100svh',
        overflow: 'hidden',
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
          key={flipKey} // <-- важно: remount при reset
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
          pointerEvents: 'auto',
          zIndex: 10,
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
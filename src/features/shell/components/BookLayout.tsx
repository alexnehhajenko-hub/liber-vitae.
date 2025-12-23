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

// Высота фиксированной шапки (SiteLayout) — подгони при желании на 64/72
const HEADER_H = 72;
// Высота нижней панели управления
const CONTROLS_H = 56;

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);

  const [current, setCurrent] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const total = pages.length;

  React.useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--lv-vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

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
            try {
              if (typeof api.turnToPage === 'function') api.turnToPage(safe);
              else api.flip(safe);
            } catch {}
          });
        });

        return;
      }

      tries += 1;
      if (tries < 120) setTimeout(init, 50);
      else setReady(false);
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [getFlip, total]);

  const screenH = 'calc(var(--lv-vh, 1vh) * 100)';

  return (
    <div
      className="lv-book-shell"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        // КЛЮЧЕВОЕ: начинаем прямо под шапкой
        top: HEADER_H,
        // и фиксируем низ, чтобы кнопки всегда были видны
        bottom: 0,
        height: `calc(${screenH} - ${HEADER_H}px)`,
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
          // чуть больше места книге
          padding: '6px 0',
          position: 'relative',
        }}
      >
        {!ready && (
          <div style={{ position: 'absolute', left: 16, bottom: 16, opacity: 0.65 }}>
            Загрузка книги…
          </div>
        )}

        <HTMLFlipBook
          // БОЛЬШЕ базовый размер = больше книга на телефоне
          width={620}
          height={840}
          size="stretch"
          minWidth={360}
          maxWidth={1400}
          minHeight={560}
          maxHeight={1800}
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
          flex: `0 0 ${CONTROLS_H}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
          zIndex: 1000,
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
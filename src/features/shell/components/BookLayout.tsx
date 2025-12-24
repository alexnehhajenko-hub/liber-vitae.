'use client';

import React from 'react';
import dynamic from 'next/dynamic';

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = any;

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod: any) => mod.default),
  { ssr: false }
) as any;

const STORAGE_KEY = 'lv_last_page_book';

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = React.useRef<any>(null);
  const apiRef = React.useRef<any>(null);

  const [current, setCurrent] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const total = pages.length;

  const resolveApi = React.useCallback(() => {
    const inst = bookRef.current;
    if (!inst) return null;

    // Вариант 1: стандартный (как в доках)
    try {
      if (typeof inst.pageFlip === 'function') {
        const api = inst.pageFlip();
        if (api) return api;
      }
    } catch {}

    // Вариант 2: иногда pageFlip лежит как объект
    try {
      if (inst.pageFlip && typeof inst.pageFlip === 'object') return inst.pageFlip;
    } catch {}

    // Вариант 3: иногда методы доступны прямо на инстансе
    try {
      if (typeof inst.flipNext === 'function' || typeof inst.flipPrev === 'function') return inst;
    } catch {}

    return null;
  }, []);

  const syncApiRef = React.useCallback(() => {
    const api = resolveApi();
    if (api) {
      apiRef.current = api;
      return true;
    }
    return false;
  }, [resolveApi]);

  const getCurrentIndex = React.useCallback((): number => {
    const api = apiRef.current;
    if (!api) return current;

    try {
      if (typeof api.getCurrentPageIndex === 'function') {
        const n = api.getCurrentPageIndex();
        if (Number.isFinite(n)) return n;
      }
    } catch {}

    return current;
  }, [current]);

  const goTo = React.useCallback((index: number) => {
    const api = apiRef.current;
    if (!api) return;

    const safe = Math.max(0, Math.min(index, total - 1));
    try {
      if (typeof api.flip === 'function') api.flip(safe);
    } catch {}

    // на всякий случай синхронизируем current после анимации
    setTimeout(() => {
      setCurrent(getCurrentIndex());
    }, 60);
  }, [getCurrentIndex, total]);

  const handlePrev = React.useCallback(() => {
    // если api не готово — попробуем подцепить ещё раз
    if (!apiRef.current) syncApiRef();

    const api = apiRef.current;
    if (!api) return;

    try {
      if (typeof api.flipPrev === 'function') api.flipPrev();
      else if (typeof api.turnToPrevPage === 'function') api.turnToPrevPage();
    } catch {}

    setTimeout(() => setCurrent(getCurrentIndex()), 60);
  }, [getCurrentIndex, syncApiRef]);

  const handleNext = React.useCallback(() => {
    if (!apiRef.current) syncApiRef();

    const api = apiRef.current;
    if (!api) return;

    try {
      if (typeof api.flipNext === 'function') api.flipNext();
      else if (typeof api.turnToNextPage === 'function') api.turnToNextPage();
    } catch {}

    setTimeout(() => setCurrent(getCurrentIndex()), 60);
  }, [getCurrentIndex, syncApiRef]);

  const handleFlip = React.useCallback((e: FlipEvent) => {
    // разные версии отдают разные поля
    const idx =
      (typeof e?.data === 'number' ? e.data : null) ??
      (typeof e?.page === 'number' ? e.page : null) ??
      getCurrentIndex();

    const safe = Math.max(0, Math.min(idx, total - 1));
    setCurrent(safe);

    try {
      window.localStorage.setItem(STORAGE_KEY, String(safe));
    } catch {}
  }, [getCurrentIndex, total]);

  // Инициализация + восстановление страницы
  React.useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const init = () => {
      if (cancelled) return;

      const ok = syncApiRef();
      if (ok) {
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
            goTo(safe);
          });
        });

        return;
      }

      tries += 1;
      if (tries < 80) setTimeout(init, 50);
      else setReady(false);
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [goTo, syncApiRef, total]);

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
          // важно: не даём wrapper перекрывать нижние кнопки кликами
          position: 'relative',
          zIndex: 10,
        }}
      >
        <HTMLFlipBook
          width={560}
          height={760}
          size="stretch"
          minWidth={320}
          maxWidth={1400}
          minHeight={480}
          maxHeight={1600}
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
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          padding: '10px 12px calc(10px + env(safe-area-inset-bottom))',

          // КЛЮЧЕВОЕ: кнопки всегда поверх всего и кликабельны на iOS
          position: 'relative',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={!ready || current <= 0}
          style={{ pointerEvents: 'auto' }}
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
          style={{ pointerEvents: 'auto' }}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};
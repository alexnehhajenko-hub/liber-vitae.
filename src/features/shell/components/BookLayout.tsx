"use client";

import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";

type BookLayoutProps = {
  pages: React.ReactNode[];
};

type FlipEvent = {
  data: number; // индекс текущей страницы из библиотеки
};

// --- Типы для API перелистывания ---

type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
};

type FlipRef = {
  pageFlip?: () => PageFlipApi;
};

// --- Динамический импорт + forwardRef, чтобы ref работал ---

const RawHTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod: any) => mod.default),
  { ssr: false }
) as any;

const HTMLFlipBook = React.forwardRef<FlipRef, any>((props, ref) => {
  return <RawHTMLFlipBook ref={ref} {...props} />;
});

HTMLFlipBook.displayName = "HTMLFlipBook";

// --- Основной компонент книги ---

export const BookLayout: React.FC<BookLayoutProps> = ({ pages }) => {
  const bookRef = useRef<FlipRef | null>(null);
  const [current, setCurrent] = useState(0);

  const total = pages.length;

  const handleFlip = useCallback((e: FlipEvent) => {
    setCurrent(e.data ?? 0);
  }, []);

  const getApi = (): PageFlipApi | null => {
    return bookRef.current?.pageFlip ? bookRef.current.pageFlip() : null;
  };

  const handlePrev = () => {
    const api = getApi();
    api?.flipPrev();
  };

  const handleNext = () => {
    const api = getApi();
    api?.flipNext();
  };

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          // делаем базовый размер страницы крупнее и чуть «вытянутым»
          width={520}
          height={720}
          size="stretch"
          minWidth={320}
          maxWidth={900}
          minHeight={480}
          maxHeight={1100}
          maxShadowOpacity={0.7}
          showCover={false}
          usePortrait
          mobileScrollSupport={false}
          className="lv-flip-book"
          ref={bookRef}
          onFlip={handleFlip}
        >
          {pages.map((page, index) => (
            <article key={index} className="lv-flip-page">
              {page}
            </article>
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

export default BookLayout;
"use client";

import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";

// ---- Обёртка над react-pageflip, чтобы нормально работал ref ----

const RawHTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod) => mod.default),
  { ssr: false }
) as any;

type FlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  getCurrentPageIndex?: () => number;
};

type FlipRef = {
  pageFlip?: () => FlipApi;
};

const HTMLFlipBook = React.forwardRef<FlipRef, any>((props, ref) => {
  return <RawHTMLFlipBook ref={ref} {...props} />;
});

HTMLFlipBook.displayName = "HTMLFlipBook";

// ---- Пропсы ----

export interface FlipBookProps {
  pages: React.ReactNode[];
}

// ---- Компонент книги ----

export function FlipBook({ pages }: FlipBookProps) {
  const bookRef = useRef<FlipRef | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages.length;

  const handleFlip = useCallback((e: any) => {
    // e.data — индекс текущей страницы в react-pageflip
    setCurrentPage(e.data ?? 0);
  }, []);

  const getApi = (): FlipApi | null => {
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

  // Размер книги (немного вытянул)
  const width = 540;
  const height = 380;

  return (
    <div className="lv-book-shell">
      <div className="lv-book-flip-wrapper">
        <HTMLFlipBook
          className="lv-flip-book"
          width={width}
          height={height}
          minWidth={280}
          maxWidth={780}
          minHeight={320}
          maxHeight={640}
          size="stretch"
          drawShadow
          showCover={false}
          mobileScrollSupport
          useMouseEvents
          onFlip={handleFlip}
          ref={bookRef}
          style={{ margin: "0 auto" }}
        >
          {pages.map((page, index) => (
            <article key={index} className="lv-flip-page">
              <div className="lv-page">{page}</div>
            </article>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="lv-book-controls">
        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handlePrev}
          disabled={currentPage <= 0}
        >
          ← Назад
        </button>

        <div className="lv-book-counter">
          Страница {currentPage + 1} / {totalPages}
        </div>

        <button
          type="button"
          className="lv-book-nav-btn"
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
}

export default FlipBook;
import React, { ReactNode } from "react";

type BookLayoutProps = {
  leftPage: ReactNode;
  rightPage: ReactNode;
};

export function BookLayout({ leftPage, rightPage }: BookLayoutProps) {
  return (
    <div style={{ position: "relative" }}>
      <div className="lv-book-shadow" />
      <div className="lv-book-layout">
        <div className="lv-book-page">{leftPage}</div>
        <div className="lv-book-page">{rightPage}</div>
      </div>
    </div>
  );
}
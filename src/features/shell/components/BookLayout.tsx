"use client";

import React from "react";
import { FlipBook } from "./FlipBook";

export const BookLayout: React.FC = () => {
  return (
    <main
      className="lv-site-main"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background:
          "radial-gradient(circle at top, #4b2b18 0%, #120907 55%, #060304 100%)",
      }}
    >
      <FlipBook />
    </main>
  );
};

export default BookLayout;
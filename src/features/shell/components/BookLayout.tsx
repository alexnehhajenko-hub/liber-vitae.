import type { ReactNode } from "react";

export function BookLayout({ leftPage, rightPage }: { leftPage: ReactNode; rightPage: ReactNode }) {
  return (
    <div>
      <div>{leftPage}</div>
      <div>{rightPage}</div>
    </div>
  );
}

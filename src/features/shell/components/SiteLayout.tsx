import React, { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

type Props = {
  children: ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
    <div className="lv-app-root">
      <SiteHeader />
      <main className="lv-site-main">
        <div className="lv-site-main-inner">{children}</div>
      </main>
    </div>
  );
}
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}

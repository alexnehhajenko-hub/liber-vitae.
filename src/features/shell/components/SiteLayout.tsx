import React from 'react';
import { SiteHeader } from '@/features/shell/components/SiteHeader';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="lv-app-root">
      <header className="lv-site-header">
        <div className="lv-site-header-inner">
          <SiteHeader />
        </div>
      </header>

      <main className="lv-site-main">
        <div className="lv-site-main-inner">{children}</div>
      </main>
    </div>
  );
};
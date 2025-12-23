import React from 'react';
import { SiteHeader } from './SiteHeader';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="lv-app-root">
      <header
        className="lv-site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
        }}
      >
        <div className="lv-site-header-inner">
          <SiteHeader />
        </div>
      </header>

      <main
        className="lv-site-main"
        style={{
          paddingTop: 72, // высота шапки
        }}
      >
        <div className="lv-site-main-inner">{children}</div>
      </main>
    </div>
  );
};
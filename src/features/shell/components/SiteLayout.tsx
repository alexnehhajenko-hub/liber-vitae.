import React from 'react';
import { SiteHeader } from './SiteHeader';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div
      className="lv-app-root"
      style={{
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        className="lv-site-header"
        style={{
          flex: '0 0 auto',
          zIndex: 50,
        }}
      >
        <div className="lv-site-header-inner">
          <SiteHeader />
        </div>
      </header>

      <main
        className="lv-site-main"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
        }}
      >

        <div
          className="lv-site-main-inner"
          style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
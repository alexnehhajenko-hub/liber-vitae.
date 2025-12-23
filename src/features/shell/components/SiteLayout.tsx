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
        minHeight: '100svh',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <header className="lv-site-header" style={{ flex: '0 0 auto' }}>
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
          flexDirection: 'column',
        }}
      >
        <div
          className="lv-site-main-inner"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
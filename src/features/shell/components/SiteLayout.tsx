'use client';

import React from 'react';
import { SiteHeader } from './SiteHeader';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  // высота шапки (под неё делаем отступ, чтобы книга не уезжала/не пропадала)
  const HEADER_H = 56;

  return (
    <div className="lv-app-root" style={{ height: '100svh', overflow: 'hidden' }}>
      <header
        className="lv-site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_H,
          zIndex: 99999,
          pointerEvents: 'auto',
        }}
      >
        <div
          className="lv-site-header-inner"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
          }}
        >
          <SiteHeader />
        </div>
      </header>

      <main
        className="lv-site-main"
        style={{
          height: '100%',
          paddingTop: HEADER_H,
          overflow: 'hidden',
        }}
      >
        <div className="lv-site-main-inner" style={{ height: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
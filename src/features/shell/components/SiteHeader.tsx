'use client';

import React from 'react';
import Link from 'next/link';

const LANG_KEY = 'lv_lang';

export const SiteHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      const el = menuRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && el.contains(target)) return;
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });

    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown as any);
    };
  }, []);

  const applyLang = (lang: 'ru' | 'en') => {
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {}
    window.location.reload();
  };

  return (
    <header
      className="lv-site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 12px',
      }}
    >
      <div className="lv-site-logo" style={{ userSelect: 'none' }}>
        LIBER VITAE
      </div>

      <div className="lv-site-header-actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link href="/book" className="lv-button lv-button-ghost">
          Новая книга
        </Link>

        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="lv-icon-button"
            aria-label="Language"
            onClick={() => setMenuOpen(v => !v)}
            style={{ width: 38, height: 38, borderRadius: 999 }}
          >
            🌐
          </button>

          {menuOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: 44,
                right: 0,
                minWidth: 170,
                borderRadius: 14,
                padding: 8,
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <button
                type="button"
                onClick={() => applyLang('en')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                English
              </button>

              <button
                type="button"
                onClick={() => applyLang('ru')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Русский
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
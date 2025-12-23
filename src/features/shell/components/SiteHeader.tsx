'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const SiteHeader: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const goBack = () => {
    try {
      router.back();
      // если history пустая — пользователь просто останется, это норм
    } catch {
      router.push('/');
    }
  };

  const setLangAndReload = (lang: 'ru' | 'en') => {
    try {
      window.localStorage.setItem('lv_lang', lang);
    } catch {}
    // чтобы книга сразу переключилась без правок большого файла — делаем перезагрузку
    window.location.reload();
  };

  return (
    <>
      <div className="lv-site-logo">LIBER VITAE</div>

      <div className="lv-site-header-actions" style={{ position: 'relative' }}>
        <button
          type="button"
          className="lv-button lv-button-ghost"
          onClick={goBack}
          aria-label="Back"
        >
          ← Назад
        </button>

        <button
          type="button"
          className="lv-icon-button"
          aria-label="Language"
          onClick={() => setMenuOpen(v => !v)}
        >
          🌐
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: 160,
              background: 'rgba(0,0,0,0.78)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 14,
              padding: 8,
              boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
              zIndex: 200,
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="lv-button lv-button-ghost"
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => setLangAndReload('ru')}
            >
              Русский
            </button>

            <button
              type="button"
              className="lv-button lv-button-ghost"
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => setLangAndReload('en')}
            >
              English
            </button>
          </div>
        )}

        {/* закрытие меню тапом вне */}
        {menuOpen && (
          <button
            type="button"
            aria-label="Close language menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'transparent',
              border: 'none',
              padding: 0,
              margin: 0,
              zIndex: 150,
            }}
          />
        )}
      </div>
    </>
  );
};
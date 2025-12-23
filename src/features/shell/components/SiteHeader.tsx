import React from 'react';
import Link from 'next/link';

export const SiteHeader: React.FC = () => {
  return (
    <>
      <div className="lv-site-logo">LIBER VITAE</div>

      <div className="lv-site-header-actions">
        <Link href="/book" className="lv-button lv-button-ghost">
          Новая книга
        </Link>

        <button type="button" className="lv-icon-button" aria-label="Language">
          🌐
        </button>
      </div>
    </>
  );
};

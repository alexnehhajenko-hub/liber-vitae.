import React from "react";

export const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="lv-site-wrapper">
      <header className="lv-header">
        <div className="lv-logo">LIBER VITAE</div>
      </header>
      <main>{children}</main>
      <footer className="lv-footer">© Liber Vitae</footer>
    </div>
  );
};
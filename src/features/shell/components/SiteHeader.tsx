import React from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  return (
    <header className="lv-site-header">
      <div className="lv-site-header-inner">
        <div className="lv-site-logo">LIBER VITAE</div>
        <div className="lv-site-header-actions">
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              color: "rgba(246,240,233,0.75)",
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Новая книга
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
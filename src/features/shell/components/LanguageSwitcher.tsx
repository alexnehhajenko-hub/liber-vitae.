'use client';

import React from 'react';

type LanguageOption = {
  code: string;
  label: string;
};

type LanguageSwitcherProps = {
  // пытаемся подхватить любые существующие пропсы,
  // чтобы ничего не сломать
  currentLanguage?: string;
  language?: string;
  languages?: LanguageOption[] | string[];
  onChangeLanguage?: (code: string) => void;
  onLanguageChange?: (code: string) => void;
};

const normalizeLanguages = (
  input: LanguageSwitcherProps['languages']
): LanguageOption[] => {
  if (!input || input.length === 0) {
    return [
      { code: 'en', label: 'EN' },
      { code: 'ru', label: 'RU' },
    ];
  }

  return input.map((item: any) => {
    if (typeof item === 'string') {
      return { code: item, label: item.toUpperCase() };
    }
    return {
      code: item.code,
      label: item.label ?? item.code.toUpperCase(),
    };
  });
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const languages = normalizeLanguages(props.languages);

  const fallbackCode =
    languages[0]?.code ??
    props.currentLanguage ??
    props.language ??
    'en';

  const currentCode =
    props.currentLanguage || props.language || fallbackCode;

  const currentLabel =
    languages.find((l) => l.code === currentCode)?.label ??
    currentCode.toUpperCase();

  const handleSelect = (code: string) => {
    setOpen(false);
    // вызываем оба колбэка — какой есть, такой и сработает
    if (props.onChangeLanguage) props.onChangeLanguage(code);
    if (props.onLanguageChange) props.onLanguageChange(code);
  };

  return (
    <div className="lv-lang-switcher">
      <button
        type="button"
        className="lv-button lv-button-ghost lv-lang-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <span>Language: {currentLabel}</span>
        <span className="lv-lang-toggle-caret">▾</span>
      </button>

      {open && (
        <div className="lv-lang-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={
                'lv-lang-menu-item' +
                (lang.code === currentCode ? ' is-active' : '')
              }
              onClick={() => handleSelect(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
// app/[slug]/page.tsx

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function DynamicPage({ params }: PageProps) {
  const rawSlug = params.slug ?? '';
  const slug = decodeURIComponent(rawSlug);

  return (
    <SiteLayout>
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />

        <div className="lv-book-open">
          {/* Левая страница — декоративная, чтобы было видно разворот */}
          <div className="lv-book-open-page lv-book-open-page--left" />

          {/* Правая страница — с текстом */}
          <article className="lv-book-open-page lv-book-open-page--right">
            <h1 className="lv-book-heading">Страница:</h1>
            <p className="lv-book-body">
              Это тестовый динамический маршрут /{slug || '…'}. <br />
              Позже мы сделаем здесь другие экраны (архив, настройки и т.п.).
            </p>
          </article>

          {/* Переплёт посередине */}
          <div className="lv-book-open-spine" />
        </div>
      </div>
    </SiteLayout>
  );
}
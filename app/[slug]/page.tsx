// app/[slug]/page.tsx

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function DynamicPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug ?? '');

  return (
    <SiteLayout>
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />
        <article className="lv-book-page">
          <h1 className="lv-book-heading">Страница: {slug}</h1>
          <p className="lv-book-body">
            Это тестовый динамический маршрут /{slug}. Позже мы сделаем здесь
            другие экраны (архив, настройки и т.п.).
          </p>
        </article>
      </div>
    </SiteLayout>
  );
}
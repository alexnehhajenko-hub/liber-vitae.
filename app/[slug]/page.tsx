'use client';

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function DynamicPage({ params }: PageProps) {
  const rawSlug = params.slug ?? '';
  const slug = decodeURIComponent(rawSlug);

  // ---------- Вариант для /book: живая книга с перелистыванием ----------
  if (slug === 'book') {
    const pages: React.ReactNode[] = [
      // Страница 1: обложка
      <div className="lv-page" key="page-1">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">LIBER VITAE</div>
          <div className="lv-page-title">Книга жизни</div>
        </div>

        <div className="lv-page-body">
          Это ваша книга жизни. Перелистайте страницу, чтобы увидеть
          первые вопросы. Позже здесь будет 40 вопросов и философский
          портрет.
        </div>

        <div className="lv-page-footer">Введение</div>
      </div>,

      // Страница 2: вопрос 1
      <div className="lv-page" key="page-2">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Вопрос I</div>
          <div className="lv-page-title">Истоки</div>
        </div>

        <div className="lv-page-body">
          Когда вы в последний раз чувствовали, что живёте именно так,
          как хотите? Что происходило вокруг и почему этот момент важен
          для вас?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-placeholder">
            Здесь позже будет поле для вашего ответа и кнопка
            &laquo;Сохранить на странице&raquo;.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 2</div>
      </div>,

      // Страница 3: вопрос 2
      <div className="lv-page" key="page-3">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Вопрос II</div>
          <div className="lv-page-title">Выбор</div>
        </div>

        <div className="lv-page-body">
          Какое решение в вашей жизни вы считаете самым смелым?
          Что вы тогда поставили на карту и чему это вас научило?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-placeholder">
            Здесь будет второй ответ. Сейчас это просто макет, чтобы
            проверить перелистывание.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 3</div>
      </div>,

      // Страница 4: портрет
      <div className="lv-page" key="page-4">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Финал</div>
          <div className="lv-page-title">Философский портрет</div>
        </div>

        <div className="lv-page-portrait-block">
          <div className="lv-page-portrait-label">
            Здесь появится ваш философский портрет
          </div>
          <div className="lv-page-portrait-caption">
            Когда подключим генерацию, на этой странице будет изображение,
            созданное по вашим ответам.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 4</div>
      </div>
    ];

    return (
      <SiteLayout>
        <BookLayout pages={pages} />
      </SiteLayout>
    );
  }

  // ---------- Все остальные страницы: статичный разворот ----------
  return (
    <SiteLayout>
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />

        <div className="lv-book-open">
          {/* Левая страница — декоративная */}
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
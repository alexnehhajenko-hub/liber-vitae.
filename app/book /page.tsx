'use client';

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';

export default function BookPage() {
  // Здесь описываем страницы книги (пока несколько тестовых)
  const pages: React.ReactNode[] = [
    // Обложка / первая страница
    (
      <div className="lv-page" key="page-1">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Liber Vitae</div>
          <div className="lv-page-title">Философский портрет</div>
        </div>

        <div className="lv-page-body">
          Добро пожаловать в вашу книгу жизни. На следующих страницах
          будут вопросы — ответы на них станут основой философского
          портрета и рукописи.
        </div>

        <div className="lv-page-footer">Введение</div>
      </div>
    ),

    // Вопрос 1
    (
      <div className="lv-page" key="page-2">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Вопрос I</div>
          <div className="lv-page-title">Истоки</div>
        </div>

        <div className="lv-page-body">
          Когда вы в последний раз чувствовали, что живёте именно так,
          как хотите? Где вы были и что происходило вокруг?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-placeholder">
            Здесь позже будет поле для ответа, которое сохранит ваш
            текст в памяти книги.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 2</div>
      </div>
    ),

    // Вопрос 2
    (
      <div className="lv-page" key="page-3">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Вопрос II</div>
          <div className="lv-page-title">Выбор</div>
        </div>

        <div className="lv-page-body">
          Какое решение в вашей жизни вы считаете по-настоящему
          смелым? Что вы тогда поставили на карту?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-placeholder">
            Здесь тоже будет поле для ответа. Сейчас это просто
            декоративный макет.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 3</div>
      </div>
    ),

    // Финальная страница (заглушка под портрет)
    (
      <div className="lv-page" key="page-4">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Завершение</div>
          <div className="lv-page-title">Портрет</div>
        </div>

        <div className="lv-page-portrait-block">
          <div className="lv-page-portrait-label">
            Здесь появится ваш философский портрет
          </div>
          <div className="lv-page-portrait-caption">
            Когда мы подключим генерацию, на этой странице будет
            изображение, созданное по вашим ответам.
          </div>
        </div>

        <div className="lv-page-footer">Финал</div>
      </div>
    )
  ];

  return (
    <SiteLayout>
      <BookLayout pages={pages} />
    </SiteLayout>
  );
}
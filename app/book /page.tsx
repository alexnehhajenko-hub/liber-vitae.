'use client';

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';

export default function BookPage() {
  // ВРЕМЕННЫЕ СТРАНИЦЫ КНИГИ — просто чтобы проверить перелистывание.
  // Потом сюда подставим 40 вопросов.
  const pages: React.ReactNode[] = [
    // ===== Страница 1: Обложка =====
    <div className="lv-page" key="page-1">
      <div className="lv-page-header">
        <div className="lv-page-subtitle">LIBER VITAE</div>
        <div className="lv-page-title">Книга жизни</div>
      </div>

      <div className="lv-page-body">
        Это главная книга. Перелистай страницу — и увидишь первый вопрос.
        Сейчас это тестовый макет, но именно здесь будет 40 вопросов и
        философский портрет.
      </div>

      <div className="lv-page-footer">Введение</div>
    </div>,

    // ===== Страница 2: Вопрос 1 =====
    <div className="lv-page" key="page-2">
      <div className="lv-page-header">
        <div className="lv-page-subtitle">Вопрос I</div>
        <div className="lv-page-title">Истоки</div>
      </div>

      <div className="lv-page-body">
        Когда вы в последний раз чувствовали, что живёте именно так, как
        хотите? Что тогда происходило и почему этот момент для вас важен?
      </div>

      <div className="lv-page-answer">
        <div className="lv-page-answer-placeholder">
          Здесь позже появится поле для вашего ответа и кнопка &laquo;Сохранить
          на странице&raquo;.
        </div>
      </div>

      <div className="lv-page-footer">Стр. 2</div>
    </div>,

    // ===== Страница 3: Вопрос 2 =====
    <div className="lv-page" key="page-3">
      <div className="lv-page-header">
        <div className="lv-page-subtitle">Вопрос II</div>
        <div className="lv-page-title">Выбор</div>
      </div>

      <div className="lv-page-body">
        Какое решение в вашей жизни вы считаете самым смелым? Что вы
        поставили на карту и чему это вас научило?
      </div>

      <div className="lv-page-answer">
        <div className="lv-page-answer-placeholder">
          Здесь будет второй ответ. Сейчас это просто макет, чтобы проверить
          перелистывание.
        </div>
      </div>

      <div className="lv-page-footer">Стр. 3</div>
    </div>,

    // ===== Страница 4: Финал / портрет =====
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
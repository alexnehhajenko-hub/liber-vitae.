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
      // Страница 1: обложка / вступление
      <div className="lv-page" key="page-1">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">LIBER VITAE</div>
          <div className="lv-page-title">Книга жизни</div>
        </div>

        <div className="lv-page-body">
          Перед вами личная книга жизни. Здесь будут ваши ответы на 40
          вопросов и философский портрет, созданный на основе этих ответов.
          Перелистайте страницу, чтобы начать.
        </div>

        <div className="lv-page-footer">Введение</div>
      </div>,

      // Страница 2: вопрос 1
      <div className="lv-page" key="page-2">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 1 из 40</div>
          <div className="lv-page-title">Истоки</div>
        </div>

        <div className="lv-page-body">
          Когда вы в последний раз чувствовали, что живёте именно так,
          как хотите? Что происходило вокруг и почему этот момент важен
          для вас?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-label">Ваш ответ</div>
          <textarea
            className="lv-page-answer-input"
            placeholder="Напишите здесь свой ответ. Не спешите, у вас есть время."
            rows={8}
          />
          <div className="lv-page-answer-hint">
            Позже здесь появится автосохранение и связь этого ответа с вашим портретом.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 2 · Вопрос I</div>
      </div>,

      // Страница 3: вопрос 2
      <div className="lv-page" key="page-3">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 2 из 40</div>
          <div className="lv-page-title">Выбор</div>
        </div>

        <div className="lv-page-body">
          Какое решение в вашей жизни вы считаете самым смелым?
          Что вы тогда поставили на карту и чему это вас научило?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-label">Ваш ответ</div>
          <textarea
            className="lv-page-answer-input"
            placeholder="Опишите тот выбор, который до сих пор чувствуете как поворотный."
            rows={8}
          />
          <div className="lv-page-answer-hint">
            Здесь будет второй ответ. Сейчас это макет, чтобы проверить формат страницы.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 3 · Вопрос II</div>
      </div>,

      // Страница 4: философский портрет (картинка)
      <div className="lv-page" key="page-4">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Финал</div>
          <div className="lv-page-title">Философский портрет</div>
        </div>

        <div className="lv-page-portrait-block">
          <div className="lv-page-portrait-label">
            Здесь появится ваш философский портрет
          </div>
          <div className="lv-page-portrait-frame">
            {/* Позже сюда подставим реальное изображение, сгенерированное ИИ */}
            <div className="lv-page-portrait-placeholder">
              Образ, собранный из ваших ответов
            </div>
          </div>
          <div className="lv-page-portrait-caption">
            Когда подключим генерацию, на этой странице будет изображение,
            созданное по вашим ответам.
          </div>
        </div>

        <div className="lv-page-footer">Стр. 4 · Портрет</div>
      </div>,

      // Стр. 5: Большой ответ · Общий образ
      <div className="lv-page" key="page-5">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть I</div>
          <div className="lv-page-title">Общий образ</div>
        </div>

        <div className="lv-page-body">
          <p>
            Здесь будет первая часть большого философского ответа — общий образ
            человека, который проявляется через его ответы. Эта страница
            расскажет, как вы обычно смотрите на мир, к чему тяготеете и
            что для вас кажется естественным способом жить.
          </p>
          <p>
            Позже сюда подставится реальный текст, созданный по вашим
            ответам. Он займет целую страницу и будет написан так, как будто
            вы держите в руках личное предисловие к собственной жизни.
          </p>
        </div>

        <div className="lv-page-footer">Стр. 5 · Общий образ</div>
      </div>,

      // Стр. 6: Большой ответ · Ценности и опоры
      <div className="lv-page" key="page-6">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть II</div>
          <div className="lv-page-title">Ценности и опоры</div>
        </div>

        <div className="lv-page-body">
          <p>
            На этой странице будет говорить о том, что для вас по-настоящему
            важно: люди, свобода, безопасность, творчество, путь, в котором
            есть смысл. Текст будет собран из оттенков ваших ответов, а не
            только из прямых слов.
          </p>
          <p>
            Здесь мы не будем ставить диагнозы и давать ярлыки — это именно
            философский взгляд: спокойное, внимательное описание того, что
            уже есть в вашей жизни и на что вы можете опираться.
          </p>
        </div>

        <div className="lv-page-footer">Стр. 6 · Ценности</div>
      </div>,

      // Стр. 7: Большой ответ · Внутренние противоречия
      <div className="lv-page" key="page-7">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть III</div>
          <div className="lv-page-title">Внутренние противоречия</div>
        </div>

        <div className="lv-page-body">
          <p>
            Здесь появится мягкий разбор тех мест, где вы сами с собой не до
            конца согласны: чего хотите и чего боитесь одновременно, где
            вам тесно в старых решениях, но страшно делать новые.
          </p>
          <p>
            Важно, что речь будет не о &laquo;проблемах&raquo;, а о живых
            противоречиях, которые есть у каждого человека. Текст поможет
            увидеть их яснее и относиться к ним бережнее.
          </p>
        </div>

        <div className="lv-page-footer">Стр. 7 · Противоречия</div>
      </div>,

      // Стр. 8: Большой ответ · Сюжет пути
      <div className="lv-page" key="page-8">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть IV</div>
          <div className="lv-page-title">Сюжет пути</div>
        </div>

        <div className="lv-page-body">
          <p>
            Эта страница опишет ваш путь как историю: откуда вы идёте,
            через какие повороты уже прошли и в какой точке, судя по
            ответам, находитесь сейчас.
          </p>
          <p>
            Это не будет прогнозом будущего, скорее — карта того, какие
            темы уже звучат в вашей жизни и какие развилки перед вами стоят.
          </p>
        </div>

        <div className="lv-page-footer">Стр. 8 · Путь</div>
      </div>,

      // Стр. 9: Большой ответ · Предложение будущего
      <div className="lv-page" key="page-9">
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть V</div>
          <div className="lv-page-title">Предложение будущего</div>
        </div>

        <div className="lv-page-body">
          <p>
            На этой странице будут несколько аккуратных предложений:
            как можно жить чуть честнее с собой, учитывая всё, что вы
            написали в этой книге. Это будут не приказы и не инструкции,
            а приглашения к следующему шагу.
          </p>
          <p>
            В финальной версии здесь появятся 2–3 очень конкретных
            направления, которые можно взять с собой после закрытия книги,
            чтобы она не осталась просто красивым объектом, а стала
            началом следующего куска пути.
          </p>
        </div>

        <div className="lv-page-footer">Стр. 9 · Дальше</div>
      </div>,
    ];

    return (
      <SiteLayout>
        {/* Вытягиваем книгу вверх: масштабируем от низа (как мы уже зафиксировали) */}
        <div
          style={{
            transform: 'scale(1.08)',
            transformOrigin: 'bottom center',
          }}
        >
          <BookLayout pages={pages} />
        </div>
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
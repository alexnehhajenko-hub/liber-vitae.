'use client';

import React, { useEffect, useState } from 'react';
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

  // --- Локальное состояние ответов (пока без сохранения на сервер) ---
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  // --- Настройка распознавания речи (диктовка) ---
  const [recognition, setRecognition] = useState<any | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) {
      return; // браузер не поддерживает — просто не включаем диктовку
    }

    const rec = new SR();
    rec.lang = 'ru-RU';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    setRecognition(rec);
  }, []);

  const startDictation = (
    setText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!recognition) {
      alert(
        'К сожалению, ваш браузер сейчас не поддерживает голосовой ввод. Можно печатать с клавиатуры.'
      );
      return;
    }

    try {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript as string;
        setText(prev =>
          prev
            ? prev + (prev.endsWith(' ') ? '' : ' ') + transcript
            : transcript
        );
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setIsListening(true);
      recognition.start();
    } catch (e) {
      setIsListening(false);
      console.error(e);
    }
  };

  // ---------- Вариант для /book: живая книга с перелистыванием ----------
  if (slug === 'book') {
    const pages: React.ReactNode[] = [
      // Страница 1: обложка / вступление
      <div
        className="lv-page"
        key="page-1"
        style={{ position: 'relative' }}
      >
        {/* Номер страницы в левом верхнем углу */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 1 · ВВЕДЕНИЕ
        </div>

        <div className="lv-page-header">
          <div className="lv-page-subtitle">LIBER VITAE</div>
          <div className="lv-page-title">Книга жизни</div>
        </div>

        <div className="lv-page-body">
          Перед вами личная книга жизни. Здесь будут ваши ответы на 40
          вопросов и философский портрет, созданный на основе этих ответов.
          Перелистайте страницу, чтобы начать.
        </div>

        {/* Низ без надписи, чтобы ничего не обрезалось */}
        <div className="lv-page-footer" />
      </div>,

      // Страница 2: вопрос 1
      <div
        className="lv-page"
        key="page-2"
        style={{ position: 'relative' }}
      >
        {/* Номер страницы / вопроса в левом верхнем углу */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 2 · ВОПРОС I
        </div>

        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 1 из 40</div>
          <div className="lv-page-title">Истоки</div>
        </div>

        {/* ВОПРОС — шрифт чуть крупнее */}
        <div
          className="lv-page-body"
          style={{ fontSize: '1.06rem', lineHeight: 1.5 }}
        >
          Когда вы в последний раз чувствовали, что живёте именно так,
          как хотите? Что происходило вокруг и почему этот момент важен
          для вас?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-label">Ваш ответ</div>

          {/* РАМКА ДЛЯ ОТВЕТА — длинная, в цвет страницы */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            <textarea
              className="lv-page-answer-input"
              placeholder="Напишите здесь свой ответ. Не спешите, у вас есть время."
              rows={5}
              value={answer1}
              onChange={e => setAnswer1(e.target.value)}
              style={{
                width: '92%', // почти на всю ширину
                minHeight: '140px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.28)',
                boxShadow:
                  '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                background: 'transparent',
                padding: '12px 18px',
                resize: 'vertical',
                fontSize: '0.96rem',
                lineHeight: 1.4,
                color: 'inherit',
              }}
            />
          </div>

          {/* Кнопка голосового ввода */}
          <div
            style={{
              width: '92%',
              margin: '6px auto 0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              fontSize: '0.8rem',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => startDictation(setAnswer1)}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.35)',
                padding: '6px 12px',
                background:
                  'linear-gradient(120deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))',
                color: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🎙</span>
              <span>{isListening ? 'Слушаю…' : 'Наговорить'}</span>
            </button>
          </div>

          <div className="lv-page-answer-hint">
            Позже здесь появится автосохранение и связь этого ответа с вашим портретом.
          </div>
        </div>

        {/* Пустой низ без текста */}
        <div className="lv-page-footer" />
      </div>,

      // Страница 3: вопрос 2
      <div
        className="lv-page"
        key="page-3"
        style={{ position: 'relative' }}
      >
        {/* Номер страницы / вопроса в левом верхнем углу */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 3 · ВОПРОС II
        </div>

        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 2 из 40</div>
          <div className="lv-page-title">Выбор</div>
        </div>

        <div
          className="lv-page-body"
          style={{ fontSize: '1.06rem', lineHeight: 1.5 }}
        >
          Какое решение в вашей жизни вы считаете самым смелым?
          Что вы тогда поставили на карту и чему это вас научило?
        </div>

        <div className="lv-page-answer">
          <div className="lv-page-answer-label">Ваш ответ</div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            <textarea
              className="lv-page-answer-input"
              placeholder="Опишите тот выбор, который до сих пор чувствуете как поворотный."
              rows={5}
              value={answer2}
              onChange={e => setAnswer2(e.target.value)}
              style={{
                width: '92%',
                minHeight: '140px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.28)',
                boxShadow:
                  '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                background: 'transparent',
                padding: '12px 18px',
                resize: 'vertical',
                fontSize: '0.96rem',
                lineHeight: 1.4,
                color: 'inherit',
              }}
            />
          </div>

          <div
            style={{
              width: '92%',
              margin: '6px auto 0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              fontSize: '0.8rem',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => startDictation(setAnswer2)}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.35)',
                padding: '6px 12px',
                background:
                  'linear-gradient(120deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))',
                color: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🎙</span>
              <span>{isListening ? 'Слушаю…' : 'Наговорить'}</span>
            </button>
          </div>

          <div className="lv-page-answer-hint">
            Здесь будет второй ответ. Сейчас это макет, чтобы проверить формат страницы.
          </div>
        </div>

        <div className="lv-page-footer" />
      </div>,

      // Страница 4: философский портрет (картинка)
      <div
        className="lv-page"
        key="page-4"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 4 · ПОРТРЕТ
        </div>

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

        <div className="lv-page-footer" />
      </div>,

      // Стр. 5: Большой ответ · Общий образ
      <div
        className="lv-page"
        key="page-5"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 5 · ОБЩИЙ ОБРАЗ
        </div>

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

        <div className="lv-page-footer" />
      </div>,

      // Стр. 6: Большой ответ · Ценности и опоры
      <div
        className="lv-page"
        key="page-6"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 6 · ЦЕННОСТИ
        </div>

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

        <div className="lv-page-footer" />
      </div>,

      // Стр. 7: Большой ответ · Внутренние противоречия
      <div
        className="lv-page"
        key="page-7"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 7 · ПРОТИВОРЕЧИЯ
        </div>

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
            Важно, что речь будет не о «проблемах», а о живых
            противоречиях, которые есть у каждого человека. Текст поможет
            увидеть их яснее и относиться к ним бережнее.
          </p>
        </div>

        <div className="lv-page-footer" />
      </div>,

      // Стр. 8: Большой ответ · Сюжет пути
      <div
        className="lv-page"
        key="page-8"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 8 · ПУТЬ
        </div>

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

        <div className="lv-page-footer" />
      </div>,

      // Стр. 9: Большой ответ · Предложение будущего
      <div
        className="lv-page"
        key="page-9"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 18,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            opacity: 0.75,
          }}
        >
          СТР. 9 · ДАЛЬШЕ
        </div>

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

        <div className="lv-page-footer" />
      </div>,
    ];

    return (
      <SiteLayout>
        {/* Вытягиваем книгу вверх, как договорились */}
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
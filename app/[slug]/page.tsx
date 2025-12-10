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

  // Локальные ответы (пока без сервера)
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  // Голосовой ввод
  const [recognition, setRecognition] = useState<any | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return;

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
        setText((prev) =>
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

  // Чтобы тап по полю не воспринимался как перелистывание
  const stopFlip = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  // ---------- /book ----------
  if (slug === 'book') {
    const pages: React.ReactNode[] = [
      // ===== Стр. 1 · Введение =====
      <div
        className="lv-page"
        key="page-1"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">LIBER VITAE</div>
          <div className="lv-page-title">Книга жизни</div>
        </div>

        <div className="lv-page-body">
          Перед вами личная книга жизни. Здесь будут ваши ответы на 40
          вопросов и философский портрет, созданный на основе этих ответов.
          Перелистайте страницу, чтобы начать.
        </div>

        <div className="lv-page-footer">СТР. 1 · ВВЕДЕНИЕ</div>
      </div>,

      // ===== Стр. 2 · Вопрос 1 =====
      <div
        className="lv-page"
        key="page-2"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 1 из 40</div>
          <div className="lv-page-title">Истоки</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.5,
            marginBottom: '6px',
          }}
        >
          Когда вы в последний раз чувствовали, что живёте именно так,
          как хотите? Что происходило вокруг и почему этот момент важен
          для вас?
        </div>

        <div
          className="lv-page-answer"
          style={{ marginBottom: '18px' }}
        >
          <div className="lv-page-answer-label">Ваш ответ</div>
          <div
            className="lv-page-answer-hint"
            style={{ marginTop: 4, fontSize: '0.8rem' }}
          >
            Можно напечатать с клавиатуры или нажать 🎙 и наговорить.
          </div>

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
              rows={4}
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
              onTouchStart={stopFlip}
              onMouseDown={stopFlip}
              style={{
                width: '92%',
                minHeight: '90px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.28)',
                boxShadow:
                  '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                background: 'transparent',
                padding: '10px 16px',
                resize: 'vertical',
                fontSize: '0.96rem',
                lineHeight: 1.4,
                color: 'inherit',
                touchAction: 'auto',
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
              onClick={(e) => {
                e.stopPropagation();
                startDictation(setAnswer1);
              }}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.35)',
                padding: '4px 10px',
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
        </div>

        <div className="lv-page-footer">СТР. 2 · ВОПРОС I</div>
      </div>,

      // ===== Стр. 3 · Вопрос 2 =====
      <div
        className="lv-page"
        key="page-3"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Книга жизни · Вопрос 2 из 40</div>
          <div className="lv-page-title">Выбор</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.5,
            marginBottom: '6px',
          }}
        >
          Какое решение в вашей жизни вы считаете самым смелым?
          Что вы тогда поставили на карту и чему это вас научило?
        </div>

        <div
          className="lv-page-answer"
          style={{ marginBottom: '18px' }}
        >
          <div className="lv-page-answer-label">Ваш ответ</div>
          <div
            className="lv-page-answer-hint"
            style={{ marginTop: 4, fontSize: '0.8rem' }}
          >
            Можно напечатать или надиктовать — как удобнее.
          </div>

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
              rows={4}
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
              onTouchStart={stopFlip}
              onMouseDown={stopFlip}
              style={{
                width: '92%',
                minHeight: '90px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.28)',
                boxShadow:
                  '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                background: 'transparent',
                padding: '10px 16px',
                resize: 'vertical',
                fontSize: '0.96rem',
                lineHeight: 1.4,
                color: 'inherit',
                touchAction: 'auto',
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
              onClick={(e) => {
                e.stopPropagation();
                startDictation(setAnswer2);
              }}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.35)',
                padding: '4px 10px',
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
        </div>

        <div className="lv-page-footer">СТР. 3 · ВОПРОС II</div>
      </div>,

      // ===== Стр. 4 · Портрет =====
      <div
        className="lv-page"
        key="page-4"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Финал</div>
          <div className="lv-page-title">Философский портрет</div>
        </div>

        <div className="lv-page-portrait-block">
          <div className="lv-page-portrait-label">
            Здесь появится ваш философский портрет
          </div>
          <div className="lv-page-portrait-frame">
            <div className="lv-page-portrait-placeholder">
              Образ, собранный из ваших ответов
            </div>
          </div>
          <div className="lv-page-portrait-caption">
            Когда подключим генерацию, на этой странице будет изображение,
            созданное по вашим ответам.
          </div>
        </div>

        <div className="lv-page-footer">СТР. 4 · ПОРТРЕТ</div>
      </div>,

      // ===== Стр. 5–9 · Большой текст =====
      <div
        className="lv-page"
        key="page-5"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть I</div>
          <div className="lv-page-title">Общий образ</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
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

        <div className="lv-page-footer">СТР. 5 · ОБЩИЙ ОБРАЗ</div>
      </div>,

      <div
        className="lv-page"
        key="page-6"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть II</div>
          <div className="lv-page-title">Ценности и опоры</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
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

        <div className="lv-page-footer">СТР. 6 · ЦЕННОСТИ</div>
      </div>,

      <div
        className="lv-page"
        key="page-7"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть III</div>
          <div className="lv-page-title">Внутренние противоречия</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
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

        <div className="lv-page-footer">СТР. 7 · ПРОТИВОРЕЧИЯ</div>
      </div>,

      <div
        className="lv-page"
        key="page-8"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть IV</div>
          <div className="lv-page-title">Сюжет пути</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
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

        <div className="lv-page-footer">СТР. 8 · ПУТЬ</div>
      </div>,

      <div
        className="lv-page"
        key="page-9"
        style={{ backgroundImage: 'none' }}
      >
        <div className="lv-page-header">
          <div className="lv-page-subtitle">Философский текст · Часть V</div>
          <div className="lv-page-title">Предложение будущего</div>
        </div>

        <div
          className="lv-page-body"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
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

        <div className="lv-page-footer">СТР. 9 · ДАЛЬШЕ</div>
      </div>,
    ];

    return (
      <SiteLayout>
        {/* Без масштабирования — подложка и книга совпадают по размеру */}
        <BookLayout pages={pages} />
      </SiteLayout>
    );
  }

  // ---------- Остальные маршруты ----------
  return (
    <SiteLayout>
      <div className="lv-book-layout">
        <div className="lv-book-shadow" />

        <div className="lv-book-open">
          <div className="lv-book-open-page lv-book-open-page--left" />

          <article className="lv-book-open-page lv-book-open-page--right">
            <h1 className="lv-book-heading">Страница:</h1>
            <p className="lv-book-body">
              Это тестовый динамический маршрут /{slug || '…'}. <br />
              Позже мы сделаем здесь другие экраны (архив, настройки и т.п.).
            </p>
          </article>

          <div className="lv-book-open-spine" />
        </div>
      </div>
    </SiteLayout>
  );
}
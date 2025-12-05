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

  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

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

  // чтобы клик по полю не воспринимался как перелистывание
  const stopFlip = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  if (slug === 'book') {
    const pages: React.ReactNode[] = [
      // ---------- Стр. 1 ----------
      <div className="lv-page" key="page-1" style={{ position: 'relative' }}>
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

        <div className="lv-page-footer" />
      </div>,

      // ---------- Стр. 2 · Вопрос 1 ----------
      <div className="lv-page" key="page-2" style={{ position: 'relative' }}>
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
              onTouchStart={stopFlip}
              onMouseDown={stopFlip}
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
              onClick={e => {
                e.stopPropagation();
                startDictation(setAnswer1);
              }}
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

        <div className="lv-page-footer" />
      </div>,

      // ---------- Стр. 3 · Вопрос 2 ----------
      <div className="lv-page" key="page-3" style={{ position: 'relative' }}>
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
              onTouchStart={stopFlip}
              onMouseDown={stopFlip}
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
              onClick={e => {
                e.stopPropagation();
                startDictation(setAnswer2);
              }}
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

      // Остальные страницы (портрет + текст 5 частей) я оставил без изменений
      // — только перенесена надпись СТР. N в левый верхний угол, как в прошлой версии.
      // Чтобы не раздувать ответ, логика там такая же, как была, только без textarea.
      // Если нужно — могу прислать полный хвост заново, но он не влияет на клавиатуру.
    ];

    return (
      <SiteLayout>
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
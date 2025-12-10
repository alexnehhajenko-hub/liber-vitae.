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

  // ответы (пока только локально)
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  // голосовой ввод
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

  // чтобы тап по полю не запускал перелистывание
  const stopFlip = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  // базовый стиль страницы: футер всегда внизу
  const pageBaseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  // ---------- /book ----------
  if (slug === 'book') {
    const pages: React.ReactNode[] = [
      // ===== стр. 1: обложка =====
      <div className="lv-page" key="page-1" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">LIBER VITAE</div>
            <div className="lv-page-title">Книга жизни</div>
          </div>

          <div className="lv-page-body">
            Это ваша книга жизни. Перелистайте страницу, чтобы увидеть
            первые вопросы. Позже здесь будет 40 вопросов и философский
            портрет.
          </div>
        </div>

        <div className="lv-page-footer">СТР. 1 · ВВЕДЕНИЕ</div>
      </div>,

      // ===== стр. 2: вопрос 1 =====
      <div className="lv-page" key="page-2" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">Вопрос I</div>
            <div className="lv-page-title">Истоки</div>
          </div>

          <div
            className="lv-page-body"
            style={{ fontSize: '1.02rem', lineHeight: 1.5, marginBottom: 6 }}
          >
            Когда вы в последний раз чувствовали, что живёте именно так,
            как хотите? Что происходило вокруг и почему этот момент важен
            для вас?
          </div>

          <div
            className="lv-page-answer"
            style={{ marginBottom: 18 }}
          >
            <div className="lv-page-answer-label">Ваш ответ</div>
            <div
              className="lv-page-answer-hint"
              style={{ marginTop: 4, fontSize: '0.8rem' }}
            >
              Можно напечатать или нажать 🎙 и наговорить.
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 8,
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
                  borderRadius: 20,
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
                gap: 8,
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
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.35)',
                  padding: '4px 10px',
                  background:
                    'linear-gradient(120deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))',
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>🎙</span>
                <span>{isListening ? 'Слушаю…' : 'Наговорить'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">СТР. 2 · ВОПРОС I</div>
      </div>,

      // ===== стр. 3: вопрос 2 =====
      <div className="lv-page" key="page-3" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">Вопрос II</div>
            <div className="lv-page-title">Выбор</div>
          </div>

          <div
            className="lv-page-body"
            style={{ fontSize: '1.02rem', lineHeight: 1.5, marginBottom: 6 }}
          >
            Какое решение в вашей жизни вы считаете самым смелым?
            Что вы тогда поставили на карту и чему это вас научило?
          </div>

          <div
            className="lv-page-answer"
            style={{ marginBottom: 18 }}
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
                marginTop: 8,
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
                  borderRadius: 20,
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
                gap: 8,
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
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.35)',
                  padding: '4px 10px',
                  background:
                    'linear-gradient(120deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))',
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>🎙</span>
                <span>{isListening ? 'Слушаю…' : 'Наговорить'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">СТР. 3 · ВОПРОС II</div>
      </div>,

      // ===== стр. 4: портрет (как был) =====
      <div className="lv-page" key="page-4" style={pageBaseStyle}>
        <div>
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
        </div>

        <div className="lv-page-footer">СТР. 4 · ПОРТРЕТ</div>
      </div>,
    ];

    return (
      <SiteLayout>
        <BookLayout pages={pages} />
      </SiteLayout>
    );
  }

  // ---------- всё остальное: статичный разворот ----------
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
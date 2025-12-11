'use client';

import React, { useEffect, useState } from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';

type PageProps = {
  params: {
    slug: string;
  };
};

// Какое поле сейчас редактируется в модальном окне
type ActiveEditor = 'q1' | 'q2' | null;

export default function DynamicPage({ params }: PageProps) {
  const rawSlug = params.slug ?? '';
  const slug = decodeURIComponent(rawSlug);

  // ---- ответы (храним в состоянии) ----
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  // ---- модальное окно редактирования ----
  const [activeEditor, setActiveEditor] = useState<ActiveEditor>(null);
  const [draftText, setDraftText] = useState(''); // временный текст в модалке

  // ---- голосовой ввод ----
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

  const startDictation = () => {
    if (!recognition) {
      alert(
        'Ваш браузер сейчас не поддерживает голосовой ввод. Можно спокойно печатать с клавиатуры.'
      );
      return;
    }

    try {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript as string;
        setDraftText(prev =>
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
      console.error(e);
      setIsListening(false);
    }
  };

  // ---- открыть модалку для редактирования ответа ----
  const openEditor = (which: ActiveEditor) => {
    if (which === 'q1') {
      setDraftText(answer1);
    } else if (which === 'q2') {
      setDraftText(answer2);
    } else {
      setDraftText('');
    }
    setActiveEditor(which);
  };

  // ---- сохранить текст из модалки ----
  const saveEditor = () => {
    if (activeEditor === 'q1') {
      setAnswer1(draftText);
    } else if (activeEditor === 'q2') {
      setAnswer2(draftText);
    }
    setActiveEditor(null);
    setIsListening(false);
  };

  const cancelEditor = () => {
    setActiveEditor(null);
    setIsListening(false);
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
      // ===== Стр. 1: обложка =====
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

      // ===== Стр. 2: Вопрос I =====
      <div className="lv-page" key="page-2" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">ВОПРОС I</div>
            <div className="lv-page-title">ИСТОКИ</div>
          </div>

          <div
            className="lv-page-body"
            style={{ fontSize: '1.02rem', lineHeight: 1.5, marginBottom: 6 }}
          >
            Когда вы в последний раз чувствовали, что живёте именно так,
            как хотите? Что происходило вокруг и почему этот момент важен
            для вас?
          </div>

          <div className="lv-page-answer" style={{ marginBottom: 18 }}>
            <div className="lv-page-answer-label">Ваш ответ</div>
            <div
              className="lv-page-answer-hint"
              style={{ marginTop: 4, fontSize: '0.8rem' }}
            >
              Нажмите на поле ниже, чтобы написать или наговорить ответ.
            </div>

            {/* "Фальшивое" поле: просто красивая рамка.
                При нажатии открываем модальное окно,
                где уже настоящий textarea и клавиатура. */}
            <div
              onClick={() => openEditor('q1')}
              onTouchEnd={() => openEditor('q1')}
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                className="lv-page-answer-input"
                style={{
                  width: '92%',
                  minHeight: '90px',
                  borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.28)',
                  boxShadow:
                    '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 16px',
                  fontSize: '0.96rem',
                  lineHeight: 1.4,
                  color: 'inherit',
                  overflow: 'hidden',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {answer1
                  ? answer1
                  : 'Напишите здесь свой ответ. Не спешите, у вас есть время.'}
              </div>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">СТР. 2 · ВОПРОС I</div>
      </div>,

      // ===== Стр. 3: Вопрос II =====
      <div className="lv-page" key="page-3" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">ВОПРОС II</div>
            <div className="lv-page-title">ВЫБОР</div>
          </div>

          <div
            className="lv-page-body"
            style={{ fontSize: '1.02rem', lineHeight: 1.5, marginBottom: 6 }}
          >
            Какое решение в вашей жизни вы считаете самым смелым?
            Что вы тогда поставили на карту и чему это вас научило?
          </div>

          <div className="lv-page-answer" style={{ marginBottom: 18 }}>
            <div className="lv-page-answer-label">Ваш ответ</div>
            <div
              className="lv-page-answer-hинt"
              style={{ marginTop: 4, fontSize: '0.8rem' }}
            >
              Нажмите на поле ниже, чтобы написать или наговорить ответ.
            </div>

            <div
              onClick={() => openEditor('q2')}
              onTouchEnd={() => openEditor('q2')}
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                className="lv-page-answer-input"
                style={{
                  width: '92%',
                  minHeight: '90px',
                  borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.28)',
                  boxShadow:
                    '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 16px',
                  fontSize: '0.96rem',
                  lineHeight: 1.4,
                  color: 'inherit',
                  overflow: 'hidden',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {answer2
                  ? answer2
                  : 'Опишите тот выбор, который до сих пор чувствуете как поворотный.'}
              </div>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">СТР. 3 · ВОПРОС II</div>
      </div>,

      // ===== Стр. 4: Портрет =====
      <div className="lv-page" key="page-4" style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">ФИНАЛ</div>
            <div className="lv-page-title">ФИЛОСОФСКИЙ ПОРТРЕТ</div>
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
        {/* Книга остаётся как есть, со свайпами */}
        <BookLayout pages={pages} />

        {/* Модальное окно редактирования ответа (НЕ внутри книги) */}
        {activeEditor && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: '90%',
                maxWidth: 500,
                maxHeight: '80vh',
                background:
                  'linear-gradient(180deg, #f3e0c4 0%, #e3c090 100%)',
                borderRadius: 24,
                boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
                padding: '18px 18px 14px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  marginBottom: 4,
                }}
              >
                {activeEditor === 'q1' ? 'Вопрос I' : 'Вопрос II'}
              </div>
              <div
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Ваш ответ
              </div>

              <div
                style={{
                  fontSize: '0.85rem',
                  marginBottom: 8,
                  opacity: 0.8,
                }}
              >
                Можно напечатать с клавиатуры или нажать 🎙 и наговорить.
              </div>

              <textarea
                autoFocus
                value={draftText}
                onChange={e => setDraftText(e.target.value)}
                style={{
                  flex: 1,
                  minHeight: 140,
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.25)',
                  padding: '10px 12px',
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
                  resize: 'vertical',
                }}
              />

              <div
                style={{
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  onClick={startDictation}
                  style={{
                    borderRadius: 999,
                    border: '1px solid rgba(0,0,0,0.35)',
                    padding: '6px 12px',
                    background:
                      'linear-gradient(120deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
                    color: 'rgba(255,255,255,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.9rem',
                  }}
                >
                  <span>🎙</span>
                  <span>{isListening ? 'Слушаю…' : 'Наговорить'}</span>
                </button>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={cancelEditor}
                    style={{
                      borderRadius: 999,
                      padding: '6px 12px',
                      border: '1px solid rgba(0,0,0,0.25)',
                      background: 'transparent',
                      fontSize: '0.9rem',
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    onClick={saveEditor}
                    style={{
                      borderRadius: 999,
                      padding: '6px 14px',
                      border: 'none',
                      background:
                        'linear-gradient(120deg, #b57b2f, #e2a858)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SiteLayout>
    );
  }

  // ---------- все остальные страницы ----------
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
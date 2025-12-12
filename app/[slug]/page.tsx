'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';
import { QUESTIONS, type Lang } from '../../src/features/shell/components/questions';

type PageProps = {
  params: {
    slug: string;
  };
};

type ActiveEditor = number | null;

function toRoman(n: number): string {
  const map: Record<number, string> = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
    6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
    11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV',
    16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX',
    21: 'XXI', 22: 'XXII', 23: 'XXIII', 24: 'XXIV', 25: 'XXV',
    26: 'XXVI', 27: 'XXVII', 28: 'XXVIII', 29: 'XXIX', 30: 'XXX',
    31: 'XXXI', 32: 'XXXII', 33: 'XXXIII', 34: 'XXXIV', 35: 'XXXV',
    36: 'XXXVI', 37: 'XXXVII', 38: 'XXXVIII', 39: 'XXXIX', 40: 'XL',
  };
  return map[n] ?? String(n);
}

const lsKey = (lang: Lang) => `lv_answers_${lang}`;

export default function DynamicPage({ params }: PageProps) {
  const rawSlug = params.slug ?? '';
  const slug = decodeURIComponent(rawSlug);

  // только /book
  if (slug !== 'book') {
    return (
      <SiteLayout>
        <div className="lv-book-layout">
          <div className="lv-book-shadow" />
          <div className="lv-book-open">
            <div className="lv-book-open-page lv-book-open-page--left" />
            <article className="lv-book-open-page lv-book-open-page--right">
              <h1 className="lv-book-heading">Страница:</h1>
              <p className="lv-book-body">
                Это тестовый маршрут /{slug || '…'}.
              </p>
            </article>
            <div className="lv-book-open-spine" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  // --- /book logic ---
  const [lang, setLang] = useState<Lang>('ru');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeEditor, setActiveEditor] = useState<ActiveEditor>(null);
  const [draftText, setDraftText] = useState('');
  const [recognition, setRecognition] = useState<any | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('lv_lang');
    if (saved === 'ru' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('lv_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(lsKey(lang));
      if (!raw) return setAnswers({});
      const parsed = JSON.parse(raw) as Record<string, string>;
      const norm: Record<number, string> = {};
      for (const [k, v] of Object.entries(parsed)) {
        const id = Number(k);
        if (Number.isFinite(id)) norm[id] = String(v ?? '');
      }
      setAnswers(norm);
    } catch {
      setAnswers({});
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(lsKey(lang), JSON.stringify(answers));
    } catch {}
  }, [answers, lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return setRecognition(null);

    const rec = new SR();
    rec.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setRecognition(rec);
  }, [lang]);

  const startDictation = () => {
    if (!recognition) return;

    try {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript as string;
        setDraftText(prev =>
          prev ? prev + (prev.endsWith(' ') ? '' : ' ') + transcript : transcript
        );
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const openEditor = (qid: number) => {
    setDraftText(answers[qid] ?? '');
    setActiveEditor(qid);
  };

  const saveEditor = () => {
    if (activeEditor == null) return;
    const qid = activeEditor;
    setAnswers(prev => ({ ...prev, [qid]: draftText }));
    setActiveEditor(null);
    setIsListening(false);
  };

  const cancelEditor = () => {
    setActiveEditor(null);
    setIsListening(false);
  };

  const doneCount = useMemo(() => {
    let c = 0;
    for (const q of QUESTIONS) {
      if ((answers[q.id] ?? '').trim().length > 0) c++;
    }
    return c;
  }, [answers]);

  const pageBaseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  const cover = (
    <div className="lv-page" key="cover" style={pageBaseStyle}>
      <div>
        <div className="lv-page-header">
          <div className="lv-page-subtitle">LIBER VITAE</div>
          <div className="lv-page-title">
            {lang === 'ru' ? 'Книга жизни' : 'Book of Life'}
          </div>
        </div>

        <div className="lv-page-body">
          {lang === 'ru'
            ? 'Ответьте на 40 вопросов — и мы соберём ваш философский портрет.'
            : 'Answer 40 questions — and we will compose your philosophical portrait.'}
        </div>

        <div style={{ marginTop: 12, fontSize: '0.9rem', opacity: 0.9 }}>
          {lang === 'ru' ? `Готово: ${doneCount} / 40` : `Done: ${doneCount} / 40`}
        </div>
      </div>

      <div className="lv-page-footer">
        {lang === 'ru' ? 'СТР. 1 · ВВЕДЕНИЕ' : 'PAGE 1 · INTRO'}
      </div>
    </div>
  );

  const questionPages = QUESTIONS.map((q, idx) => {
    const pageNumber = 2 + idx;
    const answerText = answers[q.id] ?? '';
    const footer =
      lang === 'ru'
        ? `СТР. ${pageNumber} · ВОПРОС ${toRoman(q.id)}`
        : `PAGE ${pageNumber} · QUESTION ${toRoman(q.id)}`;

    return (
      <div className="lv-page" key={`q-${q.id}`} style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">{q.subtitle[lang]}</div>
            <div className="lv-page-title">{q.title[lang]}</div>
          </div>

          <div className="lv-page-body" style={{ fontSize: '1.02rem', lineHeight: 1.5 }}>
            {q.text[lang]}
          </div>

          <div className="lv-page-answer" style={{ marginTop: 10, marginBottom: 18 }}>
            <div className="lv-page-answer-label">
              {lang === 'ru' ? 'Ваш ответ' : 'Your answer'}
            </div>

            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
              <div
                onClick={() => openEditor(q.id)}
                onTouchEnd={() => openEditor(q.id)}
                style={{
                  width: '92%',
                  minHeight: 90,
                  borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.28)',
                  boxShadow:
                    '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 16px',
                  fontSize: '0.96rem',
                  lineHeight: 1.4,
                  color: 'inherit',
                  whiteSpace: 'pre-wrap',
                  overflow: 'hidden',
                }}
              >
                {answerText.trim()
                  ? answerText
                  : lang === 'ru'
                    ? 'Нажмите, чтобы написать ответ…'
                    : 'Tap to write your answer…'}
              </div>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">{footer}</div>
      </div>
    );
  });

  const pages = [cover, ...questionPages];

  return (
    <SiteLayout>
      {/* RU/EN + прогресс */}
      <div
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 40,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.45)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '0.82rem',
          }}
        >
          {lang === 'ru' ? `Готово ${doneCount}/40` : `Done ${doneCount}/40`}
        </div>

        <button
          type="button"
          onClick={() => setLang('ru')}
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.25)',
            background: lang === 'ru' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '0.82rem',
          }}
        >
          RU
        </button>

        <button
          type="button"
          onClick={() => setLang('en')}
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.25)',
            background: lang === 'en' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '0.82rem',
          }}
        >
          EN
        </button>
      </div>

      <BookLayout pages={pages} />

      {/* Модалка ввода */}
      {activeEditor != null && (
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
              maxWidth: 520,
              maxHeight: '80vh',
              background: 'linear-gradient(180deg, #f3e0c4 0%, #e3c090 100%)',
              borderRadius: 24,
              boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
              padding: '18px 18px 14px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.8, marginBottom: 6 }}>
              {lang === 'ru' ? `ВОПРОС ${toRoman(activeEditor)}` : `QUESTION ${toRoman(activeEditor)}`}
            </div>

            <textarea
              autoFocus
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              style={{
                flex: 1,
                minHeight: 180,
                borderRadius: 16,
                border: '1px solid rgba(0,0,0,0.25)',
                padding: '10px 12px',
                fontSize: '0.95rem',
                lineHeight: 1.4,
                resize: 'vertical',
              }}
            />

            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={startDictation}
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.35)',
                  padding: '6px 12px',
                  background: 'rgba(0,0,0,0.35)',
                  color: '#fff',
                }}
              >
                {lang === 'ru'
                  ? (isListening ? '🎙 Слушаю…' : '🎙 Наговорить')
                  : (isListening ? '🎙 Listening…' : '🎙 Dictate')}
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
                  }}
                >
                  {lang === 'ru' ? 'Отмена' : 'Cancel'}
                </button>

                <button
                  type="button"
                  onClick={saveEditor}
                  style={{
                    borderRadius: 999,
                    padding: '6px 14px',
                    border: 'none',
                    background: 'linear-gradient(120deg, #b57b2f, #e2a858)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  {lang === 'ru' ? 'Сохранить' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
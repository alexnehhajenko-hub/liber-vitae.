'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';
import { QUESTIONS, type Lang, type Question } from '../../src/features/shell/components/questions';

type PageProps = { params: { slug: string } };
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

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

type StageMeta = {
  stageIndex: 1 | 2 | 3 | 4;
  ruTitle: string;
  enTitle: string;
  ruTheme: string;
  enTheme: string;
  symbolNameRu: string;
  symbolNameEn: string;
  symbolKind: 'compass' | 'knot' | 'circle' | 'formula';
};

const STAGES: StageMeta[] = [
  {
    stageIndex: 1,
    ruTitle: 'ЭТАП I · ИСТОКИ',
    enTitle: 'STAGE I · ORIGINS',
    ruTheme: 'Внутренние ориентиры, опоры и первые решения.',
    enTheme: 'Inner orientation, supports, first decisions.',
    symbolNameRu: 'Компас',
    symbolNameEn: 'Compass',
    symbolKind: 'compass',
  },
  {
    stageIndex: 2,
    ruTitle: 'ЭТАП II · ОТНОШЕНИЯ',
    enTitle: 'STAGE II · RELATIONSHIPS',
    ruTheme: 'Близость, границы, конфликт и поддержка.',
    enTheme: 'Closeness, boundaries, conflict, support.',
    symbolNameRu: 'Узел',
    symbolNameEn: 'Knot',
    symbolKind: 'knot',
  },
  {
    stageIndex: 3,
    ruTitle: 'ЭТАП III · СМЫСЛ',
    enTitle: 'STAGE III · MEANING',
    ruTheme: 'Ценности, время, мечты и след.',
    enTheme: 'Values, time, dreams, legacy.',
    symbolNameRu: 'Круг',
    symbolNameEn: 'Circle',
    symbolKind: 'circle',
  },
  {
    stageIndex: 4,
    ruTitle: 'ЭТАП IV · ИТОГ',
    enTitle: 'STAGE IV · INTEGRATION',
    ruTheme: 'Принятие, ответственность и формула жизни.',
    enTheme: 'Acceptance, responsibility, life formula.',
    symbolNameRu: 'Знак',
    symbolNameEn: 'Mark',
    symbolKind: 'formula',
  },
];

function SymbolCard({ kind }: { kind: StageMeta['symbolKind'] }) {
  const commonWrap: React.CSSProperties = {
    width: '92%',
    margin: '0 auto',
    padding: '18px 14px',
    borderRadius: 24,
    border: '1px solid rgba(0,0,0,0.26)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const svgStyle: React.CSSProperties = {
    width: '240px',
    height: '240px',
    opacity: 0.9,
    filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.35))',
  };

  if (kind === 'compass') {
    return (
      <div style={commonWrap}>
        <svg viewBox="0 0 200 200" style={svgStyle}>
          <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2" />
          <line x1="100" y1="18" x2="100" y2="38" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <line x1="100" y1="162" x2="100" y2="182" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <line x1="18" y1="100" x2="38" y2="100" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <line x1="162" y1="100" x2="182" y2="100" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <polygon points="100,42 124,100 100,158 76,100" fill="rgba(0,0,0,0.18)" stroke="rgba(0,0,0,0.55)" strokeWidth="2" />
          <polygon points="100,54 114,100 100,146 86,100" fill="rgba(255,255,255,0.20)" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
          <circle cx="100" cy="100" r="6" fill="rgba(0,0,0,0.55)" />
        </svg>
      </div>
    );
  }

  if (kind === 'knot') {
    return (
      <div style={commonWrap}>
        <svg viewBox="0 0 200 200" style={svgStyle}>
          <path
            d="M50,100
               C50,55 85,40 100,60
               C115,40 150,55 150,100
               C150,145 115,160 100,140
               C85,160 50,145 50,100 Z"
            fill="none"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M70,100
               C70,75 90,65 100,78
               C110,65 130,75 130,100
               C130,125 110,135 100,122
               C90,135 70,125 70,100 Z"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="4" fill="rgba(0,0,0,0.55)" />
        </svg>
      </div>
    );
  }

  if (kind === 'circle') {
    return (
      <div style={commonWrap}>
        <svg viewBox="0 0 200 200" style={svgStyle}>
          <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="8" />
          <circle cx="100" cy="100" r="56" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
          <path
            d="M100,24
               C135,30 160,58 166,92
               C172,130 150,164 112,172"
            fill="none"
            stroke="rgba(0,0,0,0.28)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="rgba(0,0,0,0.55)" />
        </svg>
      </div>
    );
  }

  return (
    <div style={commonWrap}>
      <svg viewBox="0 0 200 200" style={svgStyle}>
        <path d="M40 60 H160" stroke="rgba(0,0,0,0.55)" strokeWidth="8" strokeLinecap="round" />
        <path d="M40 100 H160" stroke="rgba(0,0,0,0.35)" strokeWidth="8" strokeLinecap="round" />
        <path d="M40 140 H160" stroke="rgba(0,0,0,0.55)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="70" cy="60" r="10" fill="rgba(255,255,255,0.18)" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <circle cx="130" cy="100" r="10" fill="rgba(255,255,255,0.18)" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <circle cx="90" cy="140" r="10" fill="rgba(255,255,255,0.18)" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <path d="M62 60 L110 100 L90 140" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

function stageStats(stageQuestions: Question[], answers: Record<number, string>) {
  let answered = 0;
  let words = 0;

  for (const q of stageQuestions) {
    const t = (answers[q.id] ?? '').trim();
    if (t.length > 0) answered++;
    words += t.split(/\s+/).filter(Boolean).length;
  }

  const avgWords = answered > 0 ? words / answered : 0;
  return { answered, avgWords };
}

function buildStageSummaryText(meta: StageMeta, stats: ReturnType<typeof stageStats>, lang: Lang) {
  const pct = Math.round((stats.answered / 10) * 100);

  if (lang === 'ru') {
    return [
      `Вы закончили ${meta.ruTitle.toLowerCase()}.`,
      `Заполнено: ${stats.answered}/10 (${pct}%).`,
      `Тема этапа: ${meta.ruTheme}`,
      `Дальше — следующий этап. Но уже сейчас у вас появляется “каркас” будущего философского портрета.`,
    ];
  }

  return [
    `You finished ${meta.enTitle.toLowerCase()}.`,
    `Completed: ${stats.answered}/10 (${pct}%).`,
    `Stage theme: ${meta.enTheme}`,
    `Next comes the next stage. But already you are building the frame of your final portrait.`,
  ];
}

function buildFinalPortraitPages(lang: Lang) {
  if (lang === 'ru') {
    return [
      { title: 'ФИНАЛ · ФИЛОСОФСКИЙ ПОРТРЕТ', body: ['Это финальный раздел. Здесь будет ваш полный текстовый портрет.', 'Сейчас это шаблон — позже подключим AI и сделаем по вашим ответам.'], footer: 'ПОРТРЕТ · 1/5' },
      { title: 'КТО ВЫ', body: ['Здесь будет сильное описание личности: как вы мыслите, что цените, как выбираете.'], footer: 'ПОРТРЕТ · 2/5' },
      { title: 'КАК ВЫ ЖИВЁТЕ', body: ['Здесь будет то, как вы строите отношения, проходите трудности и восстанавливаетесь.'], footer: 'ПОРТРЕТ · 3/5' },
      { title: 'ВАШ СМЫСЛ', body: ['Здесь будет смысловая часть: что вас ведёт, что для вас важно, какой след вы хотите оставить.'], footer: 'ПОРТРЕТ · 4/5' },
      { title: 'ВАША ФОРМУЛА', body: ['Здесь будет итоговая “формула” из ваших ответов.', 'Ниже вы можете пройти опрос заново и улучшить портрет.'], footer: 'ПОРТРЕТ · 5/5' },
    ];
  }

  return [
    { title: 'FINAL · PHILOSOPHICAL PORTRAIT', body: ['This is the final section. Your full text portrait will live here.', 'For now it’s a template—later we add AI based on your answers.'], footer: 'PORTRAIT · 1/5' },
    { title: 'WHO YOU ARE', body: ['A strong personality description will appear here: how you think, what you value, how you choose.'], footer: 'PORTRAIT · 2/5' },
    { title: 'HOW YOU LIVE', body: ['How you build relationships, face difficulties, and recover.'], footer: 'PORTRAIT · 3/5' },
    { title: 'YOUR MEANING', body: ['Meaning layer: what guides you, what matters, what legacy you want.'], footer: 'PORTRAIT · 4/5' },
    { title: 'YOUR FORMULA', body: ['Your final “formula” based on answers.', 'Below you can restart the quiz to refine the portrait.'], footer: 'PORTRAIT · 5/5' },
  ];
}

export default function DynamicPage({ params }: PageProps) {
  const rawSlug = params.slug ?? '';
  const slug = decodeURIComponent(rawSlug);

  const [lang, setLang] = useState<Lang>('ru');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeEditor, setActiveEditor] = useState<ActiveEditor>(null);
  const [draftText, setDraftText] = useState('');
  const [recognition, setRecognition] = useState<any | null>(null);
  const [isListening, setIsListening] = useState(false);

  const resetAll = () => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem('lv_answers_ru');
      window.localStorage.removeItem('lv_answers_en');
      window.localStorage.setItem('lv_last_page_book', '0');
    } catch {}

    setAnswers({});
    setActiveEditor(null);
    setDraftText('');
    setIsListening(false);

    // команда BookLayout: перейти на начало
    window.dispatchEvent(new CustomEvent('lv:resetBook'));
  };

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

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
        setDraftText(prev => (prev ? prev + (prev.endsWith(' ') ? '' : ' ') + transcript : transcript));
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
    for (const q of QUESTIONS) if ((answers[q.id] ?? '').trim().length > 0) c++;
    return c;
  }, [answers]);

  if (slug !== 'book') {
    return (
      <SiteLayout>
        <div className="lv-book-layout">
          <div className="lv-book-shadow" />
          <div className="lv-book-open">
            <div className="lv-book-open-page lv-book-open-page--left" />
            <article className="lv-book-open-page lv-book-open-page--right">
              <h1 className="lv-book-heading">Страница:</h1>
              <p className="lv-book-body">Это тестовый маршрут /{slug || '…'}.</p>
            </article>
            <div className="lv-book-open-spine" />
          </div>
        </div>
      </SiteLayout>
    );
  }

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
          <div className="lv-page-title">{lang === 'ru' ? 'Книга жизни' : 'Book of Life'}</div>
        </div>

        <div className="lv-page-body">
          {lang === 'ru'
            ? 'Книга состоит из 4 этапов по 10 вопросов. После каждого этапа — краткий итог и символ.'
            : 'The book has 4 stages of 10 questions. After each stage you get a short summary and a symbol.'}
        </div>

        <div style={{ marginTop: 12, fontSize: '0.9rem', opacity: 0.9 }}>
          {lang === 'ru' ? `Готово: ${doneCount} / 40` : `Done: ${doneCount} / 40`}
        </div>
      </div>

      <div className="lv-page-footer">{lang === 'ru' ? 'СТР. 1 · ВВЕДЕНИЕ' : 'PAGE 1 · INTRO'}</div>
    </div>
  );

  const stages = chunk(QUESTIONS, 10);
  const pages: React.ReactNode[] = [cover];
  let pageNumber = 2;

  for (let s = 0; s < stages.length; s++) {
    const stageIndex = (s + 1) as 1 | 2 | 3 | 4;
    const meta = STAGES[s];
    const stageQuestions = stages[s];

    for (const q of stageQuestions) {
      const answerText = answers[q.id] ?? '';
      const footer =
        lang === 'ru'
          ? `СТР. ${pageNumber} · ВОПРОС ${toRoman(q.id)}`
          : `PAGE ${pageNumber} · QUESTION ${toRoman(q.id)}`;

      pages.push(
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
              <div className="lv-page-answer-label">{lang === 'ru' ? 'Ваш ответ' : 'Your answer'}</div>

              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => openEditor(q.id)}
                  onTouchEnd={() => openEditor(q.id)}
                  style={{
                    width: '92%',
                    minHeight: 90,
                    borderRadius: 20,
                    border: '1px solid rgba(0,0,0,0.28)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.14)',
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

      pageNumber++;
    }

    // Итог этапа
    const stats = stageStats(stageQuestions, answers);
    const lines = buildStageSummaryText(meta, stats, lang);
    const stageFooter =
      lang === 'ru'
        ? `СТР. ${pageNumber} · ИТОГ ЭТАПА ${toRoman(stageIndex)}`
        : `PAGE ${pageNumber} · STAGE ${toRoman(stageIndex)} SUMMARY`;

    pages.push(
      <div className="lv-page" key={`stage-${stageIndex}-summary`} style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">{lang === 'ru' ? 'Промежуточный результат' : 'Interim result'}</div>
            <div className="lv-page-title">{lang === 'ru' ? meta.ruTitle : meta.enTitle}</div>
          </div>

          <div className="lv-page-body" style={{ fontSize: '1.02rem', lineHeight: 1.55 }}>
            {lines.map((p, i) => (
              <p key={i} style={{ margin: i === 0 ? '8px 0 10px' : '10px 0' }}>
                {p}
              </p>
            ))}

            {/* ✅ Кнопка “пройти заново” после подведения итога */}
            <div style={{ marginTop: 14 }}>
              <button
                type="button"
                onClick={resetAll}
                style={{
                  borderRadius: 999,
                  padding: '8px 14px',
                  border: 'none',
                  background: 'linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                {lang === 'ru' ? 'Пройти заново' : 'Start over'}
              </button>
            </div>
          </div>
        </div>

        <div className="lv-page-footer">{stageFooter}</div>
      </div>
    );

    pageNumber++;

    // Символ этапа
    const symbolFooter =
      lang === 'ru'
        ? `СТР. ${pageNumber} · СИМВОЛ ЭТАПА ${toRoman(stageIndex)}`
        : `PAGE ${pageNumber} · STAGE ${toRoman(stageIndex)} SYMBOL`;

    pages.push(
      <div className="lv-page" key={`stage-${stageIndex}-symbol`} style={pageBaseStyle}>
        <div>
          <div className="lv-page-header">
            <div className="lv-page-subtitle">{lang === 'ru' ? 'Символ этапа' : 'Stage symbol'}</div>
            <div className="lv-page-title">{lang === 'ru' ? meta.symbolNameRu : meta.symbolNameEn}</div>
          </div>

          <div className="lv-page-body" style={{ marginTop: 10 }}>
            <SymbolCard kind={meta.symbolKind} />
          </div>
        </div>

        <div className="lv-page-footer">{symbolFooter}</div>
      </div>
    );

    pageNumber++;

    if (stageIndex === 4) {
      const portrait = buildFinalPortraitPages(lang);
      for (let i = 0; i < portrait.length; i++) {
        const p = portrait[i];
        const footer =
          lang === 'ru'
            ? `СТР. ${pageNumber} · ${p.footer}`
            : `PAGE ${pageNumber} · ${p.footer}`;

        pages.push(
          <div className="lv-page" key={`portrait-${i}`} style={pageBaseStyle}>
            <div>
              <div className="lv-page-header">
                <div className="lv-page-subtitle">{lang === 'ru' ? 'Финал' : 'Final'}</div>
                <div className="lv-page-title">{p.title}</div>
              </div>

              <div className="lv-page-body" style={{ fontSize: '1.02rem', lineHeight: 1.55 }}>
                {p.body.map((t, idx) => (
                  <p key={idx} style={{ margin: idx === 0 ? '10px 0 12px' : '10px 0' }}>
                    {t}
                  </p>
                ))}

                {/* ✅ На финале тоже “пройти заново” */}
                {i === portrait.length - 1 && (
                  <div style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      onClick={resetAll}
                      style={{
                        borderRadius: 999,
                        padding: '8px 14px',
                        border: 'none',
                        background: 'linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      {lang === 'ru' ? 'Пройти заново' : 'Start over'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lv-page-footer">{footer}</div>
          </div>
        );

        pageNumber++;
      }
    }
  }

  return (
    <SiteLayout>
      {/* Верхняя панель: прогресс + язык + “Начать сначала” */}
      <div
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 40,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
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

        <button
          type="button"
          onClick={resetAll}
          style={{
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '0.82rem',
            fontWeight: 600,
          }}
        >
          {lang === 'ru' ? 'Начать сначала' : 'Start from beginning'}
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
                {lang === 'ru' ? (isListening ? '🎙 Слушаю…' : '🎙 Наговорить') : (isListening ? '🎙 Listening…' : '🎙 Dictate')}
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

            <div style={{ marginTop: 10, opacity: 0.75, fontSize: '0.85rem', lineHeight: 1.35 }}>
              {lang === 'ru'
                ? 'Можно писать с клавиатуры или нажать “Наговорить”.'
                : 'You can type or press “Dictate”.'}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
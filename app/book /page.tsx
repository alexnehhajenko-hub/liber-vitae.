'use client';

import React from 'react';
import { SiteLayout } from '../../src/features/shell/components/SiteLayout';
import { BookLayout } from '../../src/features/shell/components/BookLayout';
import { QuestionPage } from '../../src/features/shell/components/QuestionPage';
import { ManuscriptPage } from '../../src/features/shell/components/ManuscriptPage';

type Question = {
  id: number;
  title: string;
  text: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Вопрос I',
    text: 'О чём вы мечтаете, когда думаете о своей жизни через десять лет?',
  },
  {
    id: 2,
    title: 'Вопрос II',
    text: 'Какие три качества вы цените в себе больше всего?',
  },
  {
    id: 3,
    title: 'Вопрос III',
    text: 'Что для вас значит «оставить след» в этом мире?',
  },
  // сюда потом добавим все 40 вопросов
];

export default function BookPage() {
  const totalPages = QUESTIONS.length + 1; // вопросы + финальный лист

  const pages = [
    ...QUESTIONS.map((q, index) => (
      <QuestionPage
        key={q.id}
        index={index}
        total={totalPages}
        title={q.title}
        text={q.text}
      />
    )),
    <ManuscriptPage
      key="manuscript"
      index={QUESTIONS.length}
      total={totalPages}
    />,
  ];

  return (
    <SiteLayout>
      <BookLayout pages={pages} />
    </SiteLayout>
  );
}
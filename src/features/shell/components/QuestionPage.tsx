import React from 'react';

type QuestionPageProps = {
  index: number;
  total: number;
  title: string;
  text: string;
};

export const QuestionPage: React.FC<QuestionPageProps> = ({
  index,
  total,
  title,
  text,
}) => {
  return (
    <article className="lv-page">
      <header className="lv-page-header">
        <div className="lv-page-subtitle">LIBER VITAE</div>
        <h1 className="lv-page-title">{title}</h1>
      </header>

      <p className="lv-page-body">{text}</p>

      <div className="lv-page-answer">
        <div className="lv-page-answer-placeholder">
          Здесь появится ваш ответ на этот вопрос (и философский портрет).
        </div>
      </div>

      <footer className="lv-page-footer">
        <span>
          Лист {index + 1} из {total}
        </span>
      </footer>
    </article>
  );
};

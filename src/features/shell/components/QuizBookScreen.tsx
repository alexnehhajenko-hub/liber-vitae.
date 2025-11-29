import React from "react";
import { BookLayout } from "./BookLayout";
import { QuizQuestionPage } from "./QuizQuestionPage";

export function QuizBookScreen() {
  return (
    <BookLayout
      leftPage={<QuizQuestionPage />}
      rightPage={
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: "#5a412e",
          }}
        >
          <strong>Совет.</strong> Отвечайте так, как будто этот человек никогда не прочитает ваши
          слова. Книга создаётся ради честного взгляда, а не ради комплиментов.
        </div>
      }
    />
  );
}
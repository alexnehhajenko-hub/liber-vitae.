import { BookLayout } from "../../book/components/BookLayout";
import { QuizQuestionPage } from "./QuizQuestionPage";

export function QuizBookScreen() {
  return <BookLayout leftPage={<QuizQuestionPage />} rightPage={<div>Правая страница</div>} />;
}

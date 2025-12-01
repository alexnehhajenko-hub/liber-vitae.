// app/[slug]/page.tsx

import { BookLayout } from "../../src/features/shell/components/BookLayout";

export default function BookSlugPage() {
  // На любом адресе вида /что-угодно показываем макет книги
  return <BookLayout />;
}
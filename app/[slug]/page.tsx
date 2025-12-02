// app/[slug]/page.tsx

import BookLayout from "../../src/features/shell/components/BookLayout";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function BookSlugPage({ params }: PageProps) {
  const { slug } = params;

  // Для адреса /book показываем разворот книги
  if (slug === "book") {
    return <BookLayout />;
  }

  // Для остальных адресов — простой текст (можно потом заменить)
  return (
    <main className="lv-site-main">
      <div className="lv-book-scene">
        <section className="lv-book-page lv-book-page--text">
          <header className="lv-book-heading-block">
            <h1 className="lv-book-title">Страница: {slug}</h1>
          </header>
          <div className="lv-book-body">
            <p>
              Это тестовый динамический маршрут <code>/{slug}</code>. Позже мы
              сделаем здесь другие экраны (архив, настройки и т.п.).
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
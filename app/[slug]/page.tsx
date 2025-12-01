// app/[slug]/page.tsx

type PageProps = {
  params: {
    slug: string;
  };
};

export default function DynamicPage({ params }: PageProps) {
  const { slug } = params;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#120805",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#f5e9d2",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          borderRadius: "24px",
          padding: "32px 24px",
          border: "1px solid rgba(245, 233, 210, 0.18)",
          background:
            "radial-gradient(circle at top left, rgba(250, 215, 160, 0.08), transparent 60%), #1a0e07",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "16px",
          }}
        >
          Страница: {slug}
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          Это тестовый динамический маршрут <code>/[slug]</code>. 
          Любой путь вида <code>/что-угодно</code> должен открываться здесь.
        </p>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.7,
            marginTop: "16px",
          }}
        >
          Для нас важно, что при переходе по адресу{" "}
          <code>/book</code> мы увидим эту страницу (со словом
          «book» в заголовке), а не 404.
        </p>
      </div>
    </main>
  );
}

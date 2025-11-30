export default function BookPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#120805",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
          borderRadius: "24px",
          padding: "32px 24px",
          border: "1px solid rgba(245, 233, 210, 0.18)",
          background:
            "radial-gradient(circle at top left, rgba(250, 215, 160, 0.08), transparent 60%), #1a0e07",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.6)",
          color: "#f5e9d2",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "16px",
          }}
        >
          Черновик книги Liber Vitae
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.5,
            opacity: 0.9,
            marginBottom: "24px",
          }}
        >
          Это тестовая страница <code>/book</code>. Маршрут работает. Дальше
          сюда добавим разворот книги с портретом и текстом.
        </p>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          Вернись на главную и попробуй снова нажать кнопку «Книга обо мне».
        </p>
      </div>
    </main>
  );
}
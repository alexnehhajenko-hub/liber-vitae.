import React from "react";
import Link from "next/link";

export const BookLayout: React.FC = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 12px",
      }}
    >
      {/* Обложка-фон книги */}
      <div
        style={{
          position: "relative",
          maxWidth: 980,
          width: "100%",
          borderRadius: 32,
          padding: 28,
          background:
            "radial-gradient(circle at top, #4a2b16 0%, #1a0d07 55%, #090403 100%)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(140, 95, 56, 0.4)",
        }}
      >
        {/* Имитируем корешок посередине */}
        <div
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            left: "50%",
            width: 3,
            marginLeft: -1.5,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
            boxShadow: "0 0 14px rgba(0,0,0,0.9)",
            borderRadius: 999,
            pointerEvents: "none",
          }}
        />

        {/* Разворот книги: левая и правая страницы */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* Левая страница – текст */}
          <section
            style={{
              flex: "1 1 0",
              background:
                "radial-gradient(circle at top left, #fdf0d0 0%, #f3d8a3 55%, #e7c28b 100%)",
              borderRadius: 24,
              padding: "32px 22px 28px",
              boxShadow:
                "inset 18px 0 30px rgba(255,255,255,0.25), inset -12px 0 26px rgba(0,0,0,0.25)",
              borderRight: "1px solid rgba(179, 135, 80, 0.45)",
            }}
          >
            <header
              style={{
                textAlign: "center",
                marginBottom: 24,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7c5a32",
                fontFamily:
                  'Georgia, "Times New Roman", system-ui, -apple-system, serif',
              }}
            >
              <div style={{ fontSize: 13, marginBottom: 8 }}>LIBER VITAE</div>
              <div style={{ fontSize: 20 }}>MANUSCRIPT XVII</div>
            </header>

            <article
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "#5b3a20",
                maxWidth: 420,
                margin: "0 auto",
                fontFamily:
                  'Georgia, "Times New Roman", system-ui, -apple-system, serif',
              }}
            >
              <span
                style={{
                  float: "left",
                  fontSize: 40,
                  lineHeight: 0.9,
                  paddingRight: 8,
                  fontWeight: 600,
                  color: "#b16625",
                }}
              >
                A
              </span>
              ut viam inveniam aut faciam. Пусть эти строки будут написаны
              светом, размышлениями и памятью — это след пера, оставленный на
              бумаге времени.
            </article>
          </section>

          {/* Правая страница – портрет и кнопки */}
          <section
            style={{
              flex: "1 1 0",
              background:
                "radial-gradient(circle at top right, #fdf0d0 0%, #f3d8a3 55%, #e7c28b 100%)",
              borderRadius: 24,
              padding: "28px 22px 30px",
              boxShadow:
                "inset -18px 0 30px rgba(255,255,255,0.25), inset 12px 0 26px rgba(0,0,0,0.25)",
              borderLeft: "1px solid rgba(179, 135, 80, 0.45)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Окно будущего портрета */}
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: 22,
                padding: "30px 18px",
                marginBottom: 16,
                background:
                  "radial-gradient(circle at top, #1a120e 0%, #050303 75%)",
                boxShadow:
                  "0 18px 42px rgba(0,0,0,0.85), 0 0 0 3px rgba(181, 118, 57, 0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#f4d6aa",
                  textAlign: "center",
                }}
              >
                Портрет скоро появится
              </p>
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#7a5230",
                marginBottom: 26,
                maxWidth: 380,
                fontFamily:
                  'Georgia, "Times New Roman", system-ui, -apple-system, serif',
              }}
            >
              Философский лик, запечатлённый в вечности.
            </p>

            {/* Ряд круглых «печатей» */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 52,
                flexWrap: "wrap",
              }}
            >
              {/* Левая печать: пока без действия */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    border: "none",
                    outline: "none",
                    background:
                      "radial-gradient(circle at 30% 20%, #ffddaa 0, #da5a2a 35%, #7b260f 70%, #300903 100%)",
                    boxShadow:
                      "0 18px 32px rgba(0,0,0,0.85), 0 0 0 2px rgba(255, 233, 185, 0.45)",
                    cursor: "default",
                  }}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#7a5230",
                  }}
                >
                  СОХРАНИТЬ В АРХИВ
                </div>
              </div>

              {/* Правая печать: переход к вопросам /book/start */}
              <div style={{ textAlign: "center" }}>
                <Link
                  href="/book/start"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    textDecoration: "none",
                    background:
                      "radial-gradient(circle at 30% 20%, #ffddaa 0, #da5a2a 35%, #7b260f 70%, #300903 100%)",
                    boxShadow:
                      "0 18px 32px rgba(0,0,0,0.85), 0 0 0 2px rgba(255, 233, 185, 0.45)",
                  }}
                >
                  {/* Печать без иконки — чистый круг */}
                </Link>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#7a5230",
                  }}
                >
                  НАЧАТЬ НОВЫЙ ТОМ
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
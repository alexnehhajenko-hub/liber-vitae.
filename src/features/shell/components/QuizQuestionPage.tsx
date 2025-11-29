import React from "react";
import { Button } from "../../../shared/ui/Button";

export function QuizQuestionPage() {
  return (
    <div>
      <div className="lv-book-heading">ГЛАВА I</div>
      <div className="lv-book-subheading">Кто этот человек?</div>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: "#5a412e",
          marginBottom: 10,
        }}
      >
        Если представить жизнь этого человека как книгу, о чём она? О поиске, борьбе, любви,
        свободе или ещё о чём-то? Опишите своими словами.
      </p>
      <textarea
        style={{
          width: "100%",
          minHeight: 140,
          resize: "vertical",
          padding: 10,
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.18)",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          background: "rgba(255,255,255,0.9)",
        }}
        placeholder="Ваш ответ…"
      />
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <Button>Далее</Button>
      </div>
    </div>
  );
}
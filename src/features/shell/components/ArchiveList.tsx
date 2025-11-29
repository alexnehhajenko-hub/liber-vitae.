import React from "react";

const demoBooks = [
  { id: "1", title: "Liber Vitae: Alexei" },
  { id: "2", title: "Liber Vitae: Anna" },
];

export function ArchiveList() {
  return (
    <section>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: 22,
          marginBottom: 12,
        }}
      >
        Архив книг
      </h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {demoBooks.map((book) => (
          <li
            key={book.id}
            style={{
              marginBottom: 8,
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(246,240,233,0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <span>{book.title}</span>
            <span style={{ fontSize: 11, opacity: 0.7 }}>открыть</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
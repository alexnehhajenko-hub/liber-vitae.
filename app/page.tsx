// app/page.tsx
import React from "react";
import { SiteLayout } from "@/features/shell/components/SiteLayout";
import { BookLayout } from "@/features/shell/components/BookLayout";

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Контейнер книги:
          - поднимаем книгу вверх ~на 20 мм
          - блокируем горизонтальный свайп браузера (чтобы не улетать со страницы) */}
      <div
        style={{
          marginTop: "-20mm",          // тянем выше
          touchAction: "pan-y",        // браузеру можно только вертикальный скролл
          overscrollBehaviorX: "none", // не срабатывать жест "назад/вперёд" по краям экрана
        }}
      >
        <BookLayout />
      </div>
    </SiteLayout>
  );
}
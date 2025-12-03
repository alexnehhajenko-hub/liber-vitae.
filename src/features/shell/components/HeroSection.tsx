import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="lv-hero">
      <h1 className="lv-hero-title">Liber Vitae</h1>

      <p className="lv-hero-subtitle">
        Ваша философская книга жизни. Ответьте на вопросы, и ИИ соберёт
        манускрипт и портрет, которые останутся в памяти времени.
      </p>

      <div className="lv-hero-actions">
        <Link href="/book" className="lv-button lv-button-primary">
          Начать манускрипт
        </Link>

        <button className="lv-button lv-button-ghost" type="button" disabled>
          Архив (скоро)
        </button>
      </div>
    </section>
  );
};
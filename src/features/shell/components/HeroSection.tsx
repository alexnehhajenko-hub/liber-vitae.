import React from "react";
import Link from "next/link";
import { Button } from "../../../shared/ui/Button";

export function HeroSection() {
  return (
    <section className="lv-hero">
      <h1 className="lv-hero-title">Философская книга о человеке</h1>
      <p className="lv-hero-subtitle">
        Ответьте честно на вопросы о себе или о близком человеке — и мы соберём для вас
        старинный манускрипт Liber Vitae с философским портретом в стиле XVII века.
      </p>
      <div className="lv-hero-actions">
        <Link href="/book">
          <Button>Книга обо мне</Button>
        </Link>
        <Link href="/book">
          <Button variant="ghost">Книга о близком человеке</Button>
        </Link>
      </div>
    </section>
  );
}

// app/page.tsx
import React from "react";
import { SiteLayout } from "@/features/shell/components/SiteLayout";
import { HeroSection } from "@/features/shell/components/HeroSection";

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
    </SiteLayout>
  );
}
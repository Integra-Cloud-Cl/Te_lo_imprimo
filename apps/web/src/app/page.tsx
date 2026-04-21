"use client";

import {
  Header,
  Footer,
  Hero,
  HowItWorks,
  Marquee,
  Vision
} from "@repo/ui";
import { useMemo } from "react";
import { PRODUCTS } from "@/lib/data";

export default function HomePage() {
  const randomProducts = useMemo(() => {
    return [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 10);
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Header />
      
      <Hero />

      <Marquee items={randomProducts} />

      <HowItWorks />

      <Vision />

      <Footer />
    </div>
  );
}

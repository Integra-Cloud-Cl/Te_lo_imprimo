"use client";

import {
  Header,
  Footer,
  Hero,
  HowItWorks,
  Marquee,
  RevealOnScroll,
  MagneticButton
} from "@repo/ui";
import { PRODUCTS } from "@/lib/data";
import { useMemo } from "react";

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

      {/* ── Filosofía del Estudio ──────────────────────── */}
      <section
        style={{
          background: "var(--color-text-primary)",
          color: "var(--color-bg-base)",
          padding: "var(--space-32) var(--space-8)",
        }}
      >
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-16)" }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
              color: "var(--color-bg-base)",
              maxWidth: "10ch",
              lineHeight: "var(--leading-tight)",
            }}>
              Menos, pero muy bien hecho.
            </h2>
          </div>
          
          <RevealOnScroll direction="right" delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <p style={{ fontSize: "var(--text-md)", color: "var(--color-bg-subtle)", lineHeight: "var(--leading-relaxed)" }}>
                Creemos que el mundo no necesita más plástico inútil. Por eso operamos bajo demanda: solo fabricamos lo que se requiere. 
              </p>
              <p style={{ fontSize: "var(--text-md)", color: "var(--color-bg-subtle)", lineHeight: "var(--leading-relaxed)" }}>
                Usamos bioplásticos derivados de fuentes renovables, diseñamos para durar y repensamos la relación entre lo digital y la manufactura local independiente.
              </p>
              <div style={{ marginTop: "var(--space-6)" }}>
                <MagneticButton variant="ghost" style={{ border: "1px solid var(--color-bg-base)", color: "var(--color-bg-base)" }}>
                  Nuestra visión
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}

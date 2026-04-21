"use client";

import { RevealOnScroll, StaggerChildren } from "./animations";

const STEPS = [
  {
    num: "01",
    title: "Elegir diseño",
    desc: "Explora nuestro catálogo curado de objetos tridimensionales. Cada diseño está optimizado para su fabricación.",
  },
  {
    num: "02",
    title: "Impresión premium",
    desc: "Procesamos tu pedido. Cada pieza se imprime artesanalmente capa por capa con materiales de alta calidad.",
  },
  {
    num: "03",
    title: "Recibe en casa",
    desc: "Enviamos tu pieza empacada con cuidado. Un objeto de diseño físico, materializado solo para ti.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-trabajamos"
      style={{
        padding: "var(--space-32) var(--space-8)",
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
      }}
    >
      <RevealOnScroll direction="up">
        <div style={{ textAlign: "center", marginBottom: "var(--space-20)" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-4xl)",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Cómo trabajamos
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg)" }}>
            Un proceso simple, desde la idea hasta tus manos.
          </p>
        </div>
      </RevealOnScroll>

      <StaggerChildren style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "var(--space-12)",
      }}>
        {STEPS.map((step) => (
          <div key={step.num} style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--color-accent)",
              marginBottom: "var(--space-6)",
              background: "var(--color-highlight-bg)",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              width: "max-content",
            }}>
              {step.num}
            </span>
            <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>{step.title}</h3>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>{step.desc}</p>
          </div>
        ))}
      </StaggerChildren>
    </section>
  );
}

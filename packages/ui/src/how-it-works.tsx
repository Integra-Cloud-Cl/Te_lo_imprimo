"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, StaggerChildren } from "./animations";

const STEPS = [
  {
    num: "01",
    title: "Encuentra tu estilo",
    desc: "Date una vuelta por nuestro catálogo. Hemos seleccionado y ajustado cada diseño para que se vea impecable en el mundo real.",
  },
  {
    num: "02",
    title: "Cobrando vida",
    desc: "Aquí es donde ocurre la transformación. Cuidamos cada capa de impresión con materiales premium para que tu pieza sea única y resistente.",
  },
  {
    num: "03",
    title: "Directo a tus manos",
    desc: "Preparamos tu pedido con el cariño que merece y lo enviamos a tu puerta. Un objeto pensado por ti, materializado por nosotros.",
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
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "var(--space-8)",
      }}>
        {STEPS.map((step) => (
          <motion.div 
            key={step.num} 
            whileHover={{ y: -8, boxShadow: "var(--shadow-lg)" }}
            style={{ 
              display: "flex", 
              flexDirection: "column",
              background: "var(--color-surface-1)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border-subtle)",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
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
            <p style={{ color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", margin: 0 }}>{step.desc}</p>
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}

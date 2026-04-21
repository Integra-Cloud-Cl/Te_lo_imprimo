"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { RevealOnScroll } from "./animations";
import { CursorGlow } from "./cursor-glow";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "var(--space-12) var(--space-8)",
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        zIndex: 1,
      }}
    >
      {/* ── Fondo Hero Decorativo ── */}
      <div 
        style={{
          position: "absolute",
          top: -100,
          left: 0,
          right: 0,
          height: "100vh",
          background: "linear-gradient(to bottom, var(--color-bg-muted) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: -1,
          opacity: 0.6,
        }}
      >
        <CursorGlow behindContent={true} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "var(--text-ms)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-6)",
          }}
        >
          Estudio de Impresión 3D
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--text-4xl), 8vw, var(--text-6xl))",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-none)",
            letterSpacing: "var(--tracking-tighter)",
            color: "var(--color-text-primary)",
            maxWidth: "15ch",
            marginBottom: "var(--space-8)",
          }}
        >
          Materializamos ideas con{" "}
          <span
            style={{
              color: "var(--color-text-inverse)",
              backgroundColor: "var(--color-accent)",
              padding: "0 0.15em",
              borderRadius: "var(--radius-sm)",
              display: "inline-block",
              transform: "rotate(-2deg)",
            }}
          >
            precisión
          </span>
        </h1>

        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "50ch",
            marginBottom: "var(--space-12)",
          }}
        >
          Objetos únicos, diseñados y fabricados digitalmente. Fusionamos la
          arquitectura de software con un diseño táctil para crear piezas que
          destacan.
        </p>

        <RevealOnScroll delay={0.4} direction="up">
          <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/tienda" style={{ textDecoration: "none" }}>
              <MagneticButton variant="primary" size="lg">
                Explorar Tienda
              </MagneticButton>
            </Link>
            <MagneticButton variant="ghost" size="lg" style={{ border: "1.5px solid var(--color-accent)" }}>
              Ver Portfolio ↗
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </motion.div>
    </section>
  );
}

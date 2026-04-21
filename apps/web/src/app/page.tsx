"use client";

import {
  Header,
  MagneticButton,
  RevealOnScroll,
  StaggerChildren,
  Footer,
  CursorGlow
} from "@repo/ui";
import Link from "next/link";

const MOCK_PRODUCTS = [
  { id: 1, name: "Lámpara Nube", category: "Iluminación" },
  { id: 2, name: "Florero Geométrico", category: "Decoración" },
  { id: 3, name: "Soporte Minimal", category: "Oficina" },
  { id: 4, name: "Maceta Bauhaus", category: "Jardín" },
  { id: 5, name: "Organizador Hexa", category: "Oficina" },
  { id: 6, name: "Reloj de Mesa", category: "Decoración" },
];

export default function HomePage() {
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
      {/* ── Fondo Hero Decorativo (Fade-in) ────────────────── */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80vh",
          background: "linear-gradient(to bottom, var(--color-bg-muted) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        {/* CursorGlow solo en el hero, detrás del contenido */}
        <CursorGlow behindContent={true} />
      </div>
      {/* ── Header ─────────────────────────────────────── */}
      <Header />

      {/* ── Hero Editorial ─────────────────────────────── */}
      <section
        style={{
          marginTop: "100px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "var(--space-12) var(--space-8)",
          maxWidth: "var(--container-xl)",
          margin: "100px auto 0",
        }}
      >
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

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
      </section>

      {/* ── Auto Carousel ──────────────────────────────── */}
      <section
        style={{
          padding: "var(--space-20) 0",
          background: "linear-gradient(to bottom, var(--color-bg-base) 0%, var(--color-bg-muted) 15%, var(--color-bg-muted) 85%, var(--color-bg-base) 100%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ padding: "0 var(--space-8)", maxWidth: "var(--container-xl)", margin: "0 auto", marginBottom: "var(--space-10)" }}>
          <h2 style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color: "var(--color-text-tertiary)",
            fontWeight: "var(--weight-semibold)",
          }}>Nuevos lanzamientos</h2>
        </div>

        {/* Marquee Wrapper con CSS Animación de respaldo */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div
            style={{
              display: "flex",
              gap: "var(--space-6)",
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
          >
            {[...MOCK_PRODUCTS, ...MOCK_PRODUCTS, ...MOCK_PRODUCTS].map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                style={{
                  width: "320px",
                  height: "400px",
                  background: "var(--color-surface-1)",
                  borderRadius: "var(--radius-xl)",
                  border: "1.5px solid var(--color-border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "var(--space-6)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: "var(--color-surface-2)",
                    borderRadius: "var(--radius-lg)",
                    marginBottom: "var(--space-6)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--color-text-disabled)",
                  }}
                >
                  <div style={{ width: "100px", height: "100px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)" }} />
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
                    {product.category}
                  </span>
                  <h3 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)", marginTop: "var(--space-1)" }}>
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona (3 pasos) ────────────────────── */}
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
          {[
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
          ].map((step) => (
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
                {/* Custom button to invert colors seamlessly */}
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

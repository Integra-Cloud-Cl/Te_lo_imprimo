"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { RevealOnScroll } from "./animations";
import { CursorGlow } from "./cursor-glow";

export function Hero() {
  const words = "Materializamos ideas con".split(" ");

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
        overflow: "hidden"
      }}
    >
      {/* ── Background Video Layer ── */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Lo ponemos justo detrás del contenido
          background: "var(--color-bg-base)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7, // Aumentado para que sea más visible
            transform: "scale(1.2)", // Zoom para encuadrar la impresora
            filter: "contrast(1.1) brightness(0.9)",
          }}
        >
          {/* Intentamos cargar como mov y también como mp4 por si acaso */}
          <source src="/videos/inicio.mov" type="video/quicktime" />
          <source src="/videos/inicio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay gradient para legibilidad */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255, 0.4) 0%, rgba(255,255,255, 0.8) 100%)",
          zIndex: 1
        }} />
      </div>

      {/* ── Cursor Glow y otros efectos decorativos ── */}
      <div 
        style={{
          position: "absolute",
          top: -100,
          left: 0,
          right: 0,
          height: "100vh",
          pointerEvents: "none",
          zIndex: -2, // La luz del cursor queda detrás del video
          opacity: 0.4,
        }}
      >
        <CursorGlow behindContent={true} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 10 }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text-primary)",
            background: "rgba(255,255,255, 0.6)",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "var(--space-6)",
            backdropFilter: "blur(4px)",
          }}
        >
          Estudio de Impresión 3D
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--text-4xl), 8vw, var(--text-6xl))",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            maxWidth: "20ch",
            marginBottom: "var(--space-8)",
            textShadow: "0 2px 10px rgba(255,255,255, 0.5)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            transition={{ 
              delay: words.length * 0.1, 
              type: "spring", 
              stiffness: 200, 
              damping: 15 
            }}
            style={{
              color: "var(--color-text-inverse)",
              backgroundColor: "var(--color-accent)",
              padding: "0 0.3em",
              borderRadius: "var(--radius-sm)",
              display: "inline-block",
              marginTop: "0.2em",
              boxShadow: "var(--shadow-accent-md)"
            }}
          >
            precisión
          </motion.span>
        </h1>

        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "50ch",
            marginBottom: "var(--space-12)",
            textShadow: "0 1px 4px rgba(255,255,255, 0.3)",
          }}
        >
          Objetos únicos, diseñados y fabricados digitalmente. Fusionamos la
          arquitectura de software con un diseño táctil para crear piezas que
          destacan.
        </p>

        <RevealOnScroll delay={0.8} direction="up">
          <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
            <Link href="/tienda" style={{ textDecoration: "none" }}>
              <MagneticButton 
                variant="ghost" 
                size="lg"
                style={{ 
                  border: "2px solid var(--color-accent)",
                  color: "var(--color-text-primary)",
                  minWidth: "220px",
                  backgroundColor: "rgba(255,255,255, 0.4)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ 
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  scale: 1.05
                }}
                whileTap={{ 
                  backgroundColor: "var(--color-accent)",
                  scale: 0.95
                }}
              >
                Explorar Tienda
              </MagneticButton>
            </Link>
          </div>
        </RevealOnScroll>
      </motion.div>
    </section>
  );
}

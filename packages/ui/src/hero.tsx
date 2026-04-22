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
      {/* ── Background Video Layer (Cinematic) ── */}
      <div 
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Detrás del contenido
          backgroundColor: "transparent", // Eliminado fondo negro para evitar márgenes en tema claro
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          height: "100%", // Ocupar todo el espacio para eliminar las bandas negras
          overflow: "hidden"
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6, // Opacidad al 60%
              transform: "scale(1.1)", // Ligero zoom
              filter: "contrast(1.1) brightness(0.9)",
            }}
          >
            <source src="/videos/inicio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay negro transparente */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(12,11,9, 0.3) 0%, rgba(12,11,9, 0.8) 100%)",
            zIndex: 1
          }} />
        </div>
      </div>

      {/* ── Cursor Glow ── */}
      <div 
        style={{
          position: "absolute",
          top: -100,
          left: 0,
          right: 0,
          height: "100vh",
          pointerEvents: "none",
          zIndex: -2,
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
            color: "rgba(255,255,255,0.8)", // Texto claro
            background: "rgba(255,255,255, 0.1)", // Fondo translúcido oscuro
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "var(--space-6)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)",
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
            color: "#FFFFFF", // Texto blanco
            maxWidth: "20ch",
            marginBottom: "var(--space-8)",
            textShadow: "0 2px 10px rgba(0,0,0, 0.5)",
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
              color: "#FFFFFF",
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
            color: "rgba(255,255,255,0.7)", // Texto claro
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "50ch",
            marginBottom: "var(--space-12)",
            textShadow: "0 1px 4px rgba(0,0,0, 0.5)",
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
                  color: "#FFFFFF", // Texto blanco
                  minWidth: "220px",
                  backgroundColor: "rgba(0,0,0, 0.4)", // Fondo oscuro transparente
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

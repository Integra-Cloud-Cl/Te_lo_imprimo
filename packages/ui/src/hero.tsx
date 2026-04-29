"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { RevealOnScroll } from "./animations";
import { CursorGlow } from "./cursor-glow";

import { useTheme } from "./hooks/use-theme";

export function Hero() {
  const words = "Materializamos ideas con".split(" ");
  const { theme, mounted } = useTheme();
  
  const isDark = theme === "dark" || !mounted;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        zIndex: 1,
        overflow: "hidden" 
      }}
    >
      {/* ── Background Video Layer (Cinematic & Full Width) ── */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundColor: "var(--color-bg-base)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
        }}
      >
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
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
              opacity: isDark ? 0.6 : 0.75,
              filter: isDark 
                ? "contrast(1.05) brightness(0.8) saturate(1.2)"
                : "contrast(1.1) brightness(0.9) saturate(1.1)",
            }}
          >
            <source src="/videos/inicio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay gradiente premium (adaptativo) */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(90deg, rgba(12, 11, 9, 0.5) 0%, rgba(12, 11, 9, 0.2) 50%, rgba(12, 11, 9, 0.5) 100%), linear-gradient(0deg, rgba(12, 11, 9, 0.4) 0%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))",
            zIndex: 1,
            transition: "background 0.4s ease"
          }} />
        </motion.div>
      </div>

      {/* ── Cursor Glow ── */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          pointerEvents: "none",
          zIndex: -2,
          opacity: 0.2,
        }}
      >
        <CursorGlow behindContent={true} />
      </div>

      {/* ── Content Container (Constrained) ── */}
      <div style={{
        width: "100%",
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-24) var(--space-8)",
        position: "relative",
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          style={{ 
            maxWidth: "800px",
            marginLeft: "clamp(0px, 4vw, var(--space-8))" // Asimetría suave
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: "var(--weight-bold)",
              color: "rgba(255,255,255,0.9)",
              background: "rgba(232, 66, 10, 0.2)",
              padding: "var(--space-1) var(--space-4)",
              borderRadius: "var(--radius-full)",
              marginBottom: "var(--space-6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-accent)" }} />
            Estudio de Impresión 3D
          </motion.span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-4xl), 9vw, 4.5rem)",
              fontWeight: "var(--weight-regular)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: "18ch",
              marginBottom: "var(--space-8)",
              textShadow: "0 4px 30px rgba(0,0,0, 0.2)",
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.4 + (words.length * 0.1), 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
              style={{
                color: "#FFFFFF",
                backgroundColor: "var(--color-accent)",
                padding: "0.1em 0.4em",
                borderRadius: "0.2em",
                display: "inline-block",
                marginTop: "0.15em",
                boxShadow: "0 10px 40px rgba(232, 66, 10, 0.2)",
                transform: "rotate(-1.5deg)"
              }}
            >
              precisión
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{
              fontSize: "clamp(var(--text-base), 1.5vw, var(--text-lg))",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "50ch",
              marginBottom: "var(--space-12)",
              fontWeight: "var(--weight-light)",
            }}
          >
            Objetos únicos, diseñados y fabricados digitalmente. Fusionamos la
            arquitectura de software con un diseño táctil para crear piezas que
            destacan.
          </motion.p>

          <RevealOnScroll delay={1.1} direction="up">
            <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
              <Link href="/tienda" style={{ textDecoration: "none" }}>
                <MagneticButton 
                  variant="ghost" 
                  size="lg"
                  style={{ 
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#FFFFFF",
                    minWidth: "220px",
                    height: "60px",
                    backgroundColor: "rgba(255,255,255, 0.05)",
                    backdropFilter: "blur(10px)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--weight-medium)",
                    borderRadius: "var(--radius-full)",
                  }}
                  whileHover={{ 
                    backgroundColor: "var(--color-accent)",
                    borderColor: "var(--color-accent)",
                    scale: 1.05
                  }}
                >
                  Explorar Tienda
                </MagneticButton>
              </Link>
            </div>
          </RevealOnScroll>
        </motion.div>
      </div>

      {/* ── Shape Divider (Organic transition) ── */}
      <div 
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          width: "100%",
          lineHeight: 0,
          zIndex: 5,
          pointerEvents: "none"
        }}
      >
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{
            position: "relative",
            display: "block",
            width: "calc(100% + 1.3px)",
            height: "80px",
            fill: "var(--color-bg-base)"
          }}
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,0V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}

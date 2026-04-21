"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "./animations";
import { MagneticButton } from "./magnetic-button";

export function Vision() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
                <MagneticButton 
                  variant="ghost" 
                  onClick={() => setIsOpen(true)}
                  style={{ 
                    border: "1px solid var(--color-bg-base)", 
                    color: "var(--color-bg-base)",
                    transition: "all 0.3s ease"
                  }}
                  whileHover={{ 
                    backgroundColor: "var(--color-accent)", 
                    borderColor: "var(--color-accent)",
                    color: "white"
                  }}
                >
                  Nuestra visión
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: "var(--space-4)" }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              style={{ 
                position: "relative", 
                background: "var(--color-bg-base)", 
                width: "100%", 
                maxWidth: "600px", 
                borderRadius: "var(--radius-2xl)", 
                padding: "var(--space-12)", 
                boxShadow: "var(--shadow-2xl)",
                border: "1px solid var(--color-border-subtle)"
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", marginBottom: "var(--space-8)", color: "var(--color-text-primary)" }}>Nuestra Visión</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--color-text-primary)", fontWeight: "var(--weight-medium)", lineHeight: "var(--leading-relaxed)" }}>
                  Crear con propósito, no por exceso. No estamos aquí para llenar estantes, sino para materializar soluciones. Imaginamos un futuro donde la manufactura sea local, consciente y estrictamente necesaria.
                </p>
                
                <p style={{ fontSize: "var(--text-md)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
                  Nos alejamos de la producción masiva para abrazar el valor de lo artesanal tecnológico: piezas diseñadas para durar, fabricadas con biopolímeros renovables y creadas bajo demanda. Nuestra meta es demostrar que la tecnología 3D es la herramienta definitiva para una economía circular, donde lo digital se vuelve físico solo cuando tiene un propósito real en tus manos.
                </p>
              </div>

              <button 
                onClick={() => setIsOpen(false)} 
                style={{ 
                  position: "absolute", 
                  top: "var(--space-6)", 
                  right: "var(--space-6)", 
                  background: "transparent", 
                  border: "none", 
                  color: "var(--color-text-tertiary)", 
                  cursor: "pointer", 
                  fontSize: "1.5rem" 
                }}
              >✕</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

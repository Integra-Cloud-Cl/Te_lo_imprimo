"use client";

import { useEffect, useRef, useCallback } from "react";

interface CursorGlowProps {
  /** Z-index para controlar el layering */
  zIndex?: number;
  /** Si es true, el glow se muestra detrás del contenido */
  behindContent?: boolean;
}

/**
 * CursorGlow — foco luminoso amarillo suave que sigue al mouse.
 * Usa requestAnimationFrame para suavizado sin jank.
 * Se desactiva automáticamente en touch devices.
 */
export function CursorGlow({ zIndex = 1, behindContent = false }: CursorGlowProps = {}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // No cursor glow on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!visibleRef.current && glowRef.current) {
        visibleRef.current = true;
        glowRef.current.style.opacity = "0.7"; // Reducido 30%
        // Initialize position to prevent jump from origin
        posRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        visibleRef.current = false;
        glowRef.current.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        marginLeft: "-200px",
        marginTop: "-200px",
        pointerEvents: "none",
        zIndex: -1, // Siempre atrás de todo
        opacity: 0,
        willChange: "transform",
        transition: "opacity 0.4s ease",
        background:
          "radial-gradient(circle, var(--color-highlight) 0%, rgba(245,230,66,0.05) 30%, transparent 70%)",
        mixBlendMode: "soft-light",
        filter: "blur(4px)",
      }}
    />
  );
}

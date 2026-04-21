"use client";

import * as React from "react";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  /** Magnetic pull strength (0–1). Default 0.35 */
  strength?: number;
  /** Visual variant */
  variant?: "primary" | "secondary" | "ghost";
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * MagneticButton — botón que se estira magnéticamente hacia el cursor.
 * Se mueve sutilmente al acercar el mouse, regresa con spring al salir.
 */
export const MagneticButton = React.forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(
  (
    {
      children,
      strength = 0.35,
      variant = "primary",
      size = "md",
      style,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const btnRef = (ref as React.RefObject<HTMLButtonElement>) || innerRef;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.8 });
    const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.8 });

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: any) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
        onMouseMove?.(e);
      },
      [strength, x, y, btnRef, onMouseMove]
    );

    const handleMouseLeave = useCallback(
      (e: any) => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
        onMouseLeave?.(e);
      },
      [x, y, onMouseLeave]
    );

    // Variant styles
    const variants: Record<string, React.CSSProperties> = {
      primary: {
        background: "var(--color-accent)",
        color: "var(--color-text-inverse)",
        border: "none",
      },
      secondary: {
        background: "transparent",
        color: "var(--color-text-primary)",
        border: "1.5px solid var(--color-border-default)",
      },
      ghost: {
        background: "transparent",
        color: "var(--color-text-secondary)",
        border: "1.5px solid transparent",
      },
    };

    const sizes: Record<string, React.CSSProperties> = {
      sm: {
        padding: "var(--space-2) var(--space-4)",
        fontSize: "var(--text-sm)",
        borderRadius: "var(--radius-md)",
      },
      md: {
        padding: "var(--space-3) var(--space-6)",
        fontSize: "var(--text-base)",
        borderRadius: "var(--radius-lg)",
      },
      lg: {
        padding: "var(--space-4) var(--space-8)",
        fontSize: "var(--text-md)",
        borderRadius: "var(--radius-xl)",
      },
    };

    return (
      // @ts-ignore
      <motion.button
        ref={btnRef}
        style={{
          ...variants[variant],
          ...sizes[size],
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--tracking-tight)",
          cursor: "pointer",
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-2)",
          overflow: "hidden",
          x: springX,
          y: springY,
          ...style,
        }}
        whileHover={{
          scale: 1.05,
          backgroundColor: variant === "primary" ? "var(--color-accent-hover)" : undefined,
          boxShadow:
            variant === "primary"
              ? "var(--shadow-accent-md)"
              : "var(--shadow-md)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        // @ts-ignore
        onMouseMove={handleMouseMove}
        // @ts-ignore
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        {...props}
      >
        {/* Shine sweep on hover */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              variant === "primary"
                ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)"
                : "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            pointerEvents: "none",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Content */}
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      </motion.button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

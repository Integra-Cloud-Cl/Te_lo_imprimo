"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "./contexts/cart-context";
import { useTheme } from "./hooks/use-theme";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/tienda" },
  { name: "Cómo trabajamos", href: "/#como-trabajamos" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, mounted } = useTheme();
  const { items, setIsCartOpen } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark" || !mounted; // Default to dark aesthetic if not mounted

  const glassBg = isDark 
    ? "rgba(0, 0, 0, 0.45)" 
    : "rgba(255, 255, 255, 0.65)";
  
  const glassBorder = isDark
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(0, 0, 0, 0.08)";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? "var(--space-3) var(--space-8)" : "var(--space-4) var(--space-8)",
          backgroundColor: glassBg,
          backgroundImage: "var(--bg-image-base, none)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: glassBorder,
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Izquierda: Logo */}
        <Link href="/" style={{ textDecoration: "none", zIndex: 101, display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <img 
            src="/logo.svg" 
            alt="Logo Te Lo Imprimo" 
            style={{ width: "30px", height: "30px" }} 
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-1)" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xl)",
                fontWeight: "var(--weight-black)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-text-primary)",
              }}
            >
              Te lo
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xl)",
                fontWeight: "var(--weight-black)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-accent)",
              }}
            >
              imprimo
            </span>
          </div>
        </Link>

        {/* Centro: Navegación (Desktop) */}
        <nav className="hide-on-mobile" style={{ display: "flex", gap: "var(--space-4)" }}>
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              style={{
                position: "relative",
                fontSize: "calc(var(--text-sm) * 1.2)",
                fontWeight: "var(--weight-bold)",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                letterSpacing: "var(--tracking-wide)",
                display: "inline-block",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-md)",
                transition: "all 0.3s ease",
                overflow: "hidden",
              }}
              // Efecto hover naranjo destacado
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text-inverse)";
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Derecha: Acciones (Desktop) */}
        <div className="hide-on-mobile" style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
          
          <ThemeToggle />

          <Link href="/contacto" style={{ textDecoration: "none" }}>
            <MagneticButton variant="primary" size="md">
              Contacto
            </MagneticButton>
          </Link>

          <button 
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito (${totalItems} productos)`}
            style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--color-text-primary)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "var(--color-accent)",
                    color: "var(--color-text-inverse)",
                    fontSize: "10px",
                    fontWeight: "bold",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="show-on-mobile" style={{ display: "flex", zIndex: 101, gap: "var(--space-4)", alignItems: "center" }}>
          <div className="hide-on-desktop" style={{ display: 'flex' }}>
             <ThemeToggle />
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito (${totalItems} productos)`}
            style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--color-text-primary)", padding: "var(--space-2)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    background: "var(--color-accent)",
                    color: "var(--color-text-inverse)",
                    fontSize: "10px",
                    fontWeight: "bold",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-primary)",
              cursor: "pointer",
              padding: "var(--space-2)",
            }}
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "var(--color-bg-base)",
              zIndex: 1000,
              padding: "100px var(--space-8) var(--space-8)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    fontSize: "var(--text-2xl)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    padding: "var(--space-3) var(--space-4)",
                    borderRadius: "var(--radius-lg)",
                    transition: "all 0.3s ease",
                    width: "fit-content",
                  }}
                  // Efecto hover naranjo destacado (mobile)
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text-inverse)";
                    e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-primary)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border-subtle)", paddingTop: "var(--space-6)" }}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>Apariencia</span>
              <ThemeToggle />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: "auto" }}
            >
              <Link href="/contacto" style={{ textDecoration: "none" }} onClick={() => setIsMobileOpen(false)}>
                <MagneticButton variant="primary" size="lg" style={{ width: "100%" }}>
                  Contacto
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

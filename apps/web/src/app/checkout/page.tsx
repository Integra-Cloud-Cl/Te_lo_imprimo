"use client";

import { useState } from "react";
import { Header, RevealOnScroll, useCart } from "@repo/ui";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    comuna: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsLoading(true);
    setError(null);

    try {
      // Una sola llamada al backend seguro (Next.js API Route)
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items,
          totals: { subtotal, shipping, total },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error al procesar el pago");
      }

      const { init_point, orderId } = await response.json();

      // Limpiar carrito y guardar info mínima para la UI de retorno
      clearCart();
      localStorage.setItem(
        "tli-last-order",
        JSON.stringify({
          orderId,
          customer: { nombre: formData.nombre, email: formData.email },
        })
      );

      // Redirigir a MercadoPago (o a /order-status en modo demo)
      if (init_point) {
        window.location.href = init_point;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error inesperado";
      setError(message);
      setIsLoading(false);
    }
  };

  const formatCLP = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--space-3) var(--space-4)",
    background: "var(--color-surface-1)",
    border: "1px solid var(--color-border-subtle)",
    borderRadius: "var(--radius-md)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--weight-semibold)",
    color: "var(--color-text-secondary)",
    marginBottom: "var(--space-2)",
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Header />

      <main
        style={{
          padding: "calc(100px + var(--space-8)) var(--space-8) var(--space-20)",
          maxWidth: "var(--container-xl)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-16)",
          alignItems: "start",
        }}
      >
        {/* ── Formulario ─────────────────────────────────────────────────── */}
        <RevealOnScroll direction="left">
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                marginBottom: "var(--space-8)",
              }}
            >
              Finalizar Compra
            </h1>

            <form
              onSubmit={handleCheckout}
              id="checkout-form"
              style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Nombre Completo</label>
                <input
                  required
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="hola@ejemplo.com"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Teléfono</label>
                  <input
                    required
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Dirección de envío</label>
                <input
                  required
                  name="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Av. Providencia 1234, Depto 5"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Comuna</label>
                <input
                  required
                  name="comuna"
                  type="text"
                  value={formData.comuna}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Ej. Providencia, Santiago"
                />
              </div>
            </form>
          </div>
        </RevealOnScroll>

        {/* ── Resumen de Orden ────────────────────────────────────────────── */}
        <RevealOnScroll direction="right" delay={0.2}>
          <div
            style={{
              background: "var(--color-surface-1)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-2xl)",
              padding: "var(--space-8)",
              position: "sticky",
              top: "120px",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: "var(--weight-bold)",
                marginBottom: "var(--space-6)",
              }}
            >
              Resumen de la Orden
            </h2>

            {items.length === 0 ? (
              <p style={{ color: "var(--color-text-secondary)" }}>Tu carrito está vacío.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-6)",
                  marginBottom: "var(--space-8)",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        background: "var(--color-surface-2)",
                        flexShrink: 0,
                      }}
                    >
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "var(--color-text-primary)",
                          color: "var(--color-bg-base)",
                          fontSize: "10px",
                          width: "18px",
                          height: "18px",
                          display: "grid",
                          placeItems: "center",
                          borderRadius: "0 0 0 4px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)" }}>
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {formatCLP(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totales */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <span>Subtotal</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{formatCLP(subtotal)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <span>Envío</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{formatCLP(shipping)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "var(--space-2)",
                  paddingTop: "var(--space-4)",
                  borderTop: "1px dotted var(--color-border-subtle)",
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--weight-bold)",
                }}
              >
                <span>Total</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{formatCLP(total)}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: "var(--space-4)",
                  padding: "var(--space-3) var(--space-4)",
                  background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-accent)",
                  fontSize: "var(--text-sm)",
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Botón de Pago */}
            <button
              type="submit"
              form="checkout-form"
              disabled={items.length === 0 || isLoading}
              style={{
                width: "100%",
                marginTop: "var(--space-6)",
                background: items.length === 0 || isLoading ? "var(--color-border-default)" : "#009EE3",
                color: "white",
                border: "none",
                padding: "var(--space-4)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--weight-bold)",
                cursor: items.length === 0 || isLoading ? "not-allowed" : "pointer",
                opacity: items.length === 0 || isLoading ? 0.6 : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--space-2)",
                boxShadow: items.length > 0 && !isLoading ? "0 4px 14px rgba(0,158,227,0.3)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {isLoading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Pagar con MercadoPago
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                marginTop: "var(--space-3)",
              }}
            >
              🔒 Pago 100% seguro a través de MercadoPago
            </p>
          </div>
        </RevealOnScroll>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

"use client";

import { Header, MagneticButton } from "@repo/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ── Tipos de estado posibles desde MercadoPago ───────────────────────────────
type PaymentStatus = "approved" | "pending" | "failure" | "rejected" | string;

interface StatusConfig {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  showSupport: boolean;
}

function getStatusConfig(status: PaymentStatus): StatusConfig {
  switch (status) {
    case "approved":
      return {
        iconBg: "var(--color-accent)",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
        title: "¡Pago Aprobado!",
        description: "Recibimos tu orden correctamente. Comenzaremos el proceso de impresión 3D y recibirás actualizaciones por correo electrónico.",
        showSupport: false,
      };
    case "pending":
      return {
        iconBg: "var(--color-warning)",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        title: "Pago Pendiente",
        description: "Tu pago está siendo procesado. Normalmente tarda entre 1 y 2 días hábiles. Te notificaremos cuando sea confirmado.",
        showSupport: false,
      };
    case "failure":
    case "rejected":
    default:
      return {
        iconBg: "var(--color-error, #E8420A)",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ),
        title: "Pago No Procesado",
        description: "Hubo un problema con tu método de pago. Puedes intentarlo nuevamente o usar otro medio de pago. Tu carrito sigue guardado.",
        showSupport: true,
      };
  }
}

// ── Componente interno que usa useSearchParams ───────────────────────────────
function OrderStatusContent() {
  const searchParams = useSearchParams();

  // Parámetros reales de MercadoPago en back_url
  const collectionStatus = searchParams.get("collection_status") ?? "";
  const status = searchParams.get("status") ?? collectionStatus ?? "approved";
  const paymentId = searchParams.get("payment_id") ?? searchParams.get("collection_id") ?? "";
  const orderId = searchParams.get("external_reference") ?? "";
  const isDemo = searchParams.get("demo") === "true";

  const config = getStatusConfig(status);

  const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

  return (
    <main
      style={{
        flex: 1,
        display: "grid",
        placeItems: "center",
        padding: "var(--space-8)",
        marginTop: "100px",
        minHeight: "calc(100dvh - 100px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          padding: "var(--space-12)",
          background: "var(--color-surface-1)",
          borderRadius: "var(--radius-3xl)",
          border: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Ícono animado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          style={{
            width: "88px",
            height: "88px",
            background: config.iconBg,
            color: "#ffffff",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            margin: "0 auto var(--space-8)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          {config.icon}
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-4xl)",
            marginBottom: "var(--space-4)",
            color: "var(--color-text-primary)",
          }}
        >
          {config.title}
        </motion.h1>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-md)",
            lineHeight: "var(--leading-relaxed)",
            marginBottom: "var(--space-8)",
            maxWidth: "45ch",
            marginInline: "auto",
          }}
        >
          {config.description}
        </motion.p>

        {/* Info de la orden */}
        {(orderId || paymentId) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease }}
            style={{
              background: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4) var(--space-6)",
              marginBottom: "var(--space-8)",
              textAlign: "left",
              fontSize: "var(--text-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {orderId && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-tertiary)" }}>N° Orden</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: "var(--weight-semibold)" }}>
                  {orderId}
                </span>
              </div>
            )}
            {paymentId && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-tertiary)" }}>N° Pago</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
                  {paymentId}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Badge Demo */}
        {isDemo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            style={{
              background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
              color: "var(--color-accent)",
              border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-sm)",
              marginBottom: "var(--space-8)",
            }}
          >
            <b>Modo Demo:</b> Simulación de pago completada. Configura <code>MP_ACCESS_TOKEN</code> para pagos reales.
          </motion.div>
        )}

        {/* Acciones */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-4)",
            flexWrap: "wrap",
          }}
        >
          {(status === "failure" || status === "rejected") ? (
            <>
              <Link href="/checkout" style={{ textDecoration: "none" }}>
                <MagneticButton variant="primary">Reintentar Pago</MagneticButton>
              </Link>
              <Link href="/contacto" style={{ textDecoration: "none" }}>
                <MagneticButton variant="ghost">Contactar Soporte</MagneticButton>
              </Link>
            </>
          ) : (
            <Link href="/tienda" style={{ textDecoration: "none" }}>
              <MagneticButton variant="primary">Continuar Comprando</MagneticButton>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}

// ── Página principal con Suspense (requerido por useSearchParams en Next.js) ──
export default function OrderStatusPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Suspense
        fallback={
          <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)" }}>
              Cargando estado del pago...
            </p>
          </div>
        }
      >
        <OrderStatusContent />
      </Suspense>
    </div>
  );
}

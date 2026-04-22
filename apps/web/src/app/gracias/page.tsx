"use client";

import { Header, MagneticButton } from "@repo/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// La lógica de email ahora vive en el Webhook del servidor (/api/webhooks/mercadopago)
// Esta página solo muestra el estado de la compra.

function GraciasContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "approved";
  const isDemo = searchParams.get("demo") === "true";

  const isPending = status === "pending";

  return (
    <main
      style={{
        flex: 1,
        display: "grid",
        placeItems: "center",
        padding: "var(--space-8)",
        marginTop: "100px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          textAlign: "center",
          maxWidth: "600px",
          padding: "var(--space-12)",
          background: "var(--color-surface-1)",
          borderRadius: "var(--radius-3xl)",
          border: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: "80px",
            height: "80px",
            background: isPending ? "var(--color-warning)" : "var(--color-accent)",
            color: "var(--color-text-inverse)",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            margin: "0 auto var(--space-8)",
          }}
        >
          {isPending ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </motion.div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-4xl)",
            marginBottom: "var(--space-4)",
          }}
        >
          {isPending ? "Pago Pendiente" : "¡Gracias por tu compra!"}
        </h1>

        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-md)",
            lineHeight: "var(--leading-relaxed)",
            marginBottom: "var(--space-8)",
            maxWidth: "45ch",
            marginInline: "auto",
          }}
        >
          {isPending
            ? "Estamos esperando la confirmación de tu pago. Te notificaremos por correo electrónico en cuanto se procese."
            : "Hemos recibido tu orden. Comenzaremos el proceso de impresión 3D y recibirás actualizaciones por correo."}
        </p>

        {isDemo && (
          <div
            style={{
              background: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
              color: "var(--color-accent)",
              padding: "var(--space-3)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-sm)",
              marginBottom: "var(--space-8)",
            }}
          >
            <b>Modo Demo:</b> Configura <code>MP_ACCESS_TOKEN</code> en Vercel para activar pagos reales.
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Link href="/tienda" style={{ textDecoration: "none" }}>
            <MagneticButton variant="primary">Continuar Comprando</MagneticButton>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function GraciasPage() {
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
              Cargando confirmación...
            </p>
          </div>
        }
      >
        <GraciasContent />
      </Suspense>
    </div>
  );
}

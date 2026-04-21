import type { Metadata } from "next";
import "./globals.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Te lo imprimo — Estudio de diseño de objetos e impresión 3D",
  description:
    "Estudio creativo en Santiago de Chile especializado en diseño paramétrico y fabricación digital. Materializamos ideas con precisión y polímeros sostenibles.",
  keywords: ["impresión 3D", "diseño industrial", "Santiago", "Chile", "manufactura aditiva", "objetos personalizados", "estudio de diseño"],
  authors: [{ name: "Integra Cloud" }],
  metadataBase: new URL("https://teloimprimo.cl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Te lo imprimo — Diseño y Fabricación Digital",
    description: "Materializamos tus ideas con impresión 3D de alta precisión.",
    url: "https://teloimprimo.cl",
    siteName: "Te lo imprimo",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Te lo imprimo",
    description: "Estudio creativo de impresión 3D en Chile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CartProvider, CartDrawer } from "@repo/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Anti-flash: aplica el tema antes del primer render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('tli-theme');
                  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = stored || preferred;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Forzar scroll al inicio al recargar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
      </head>
      <body className="theme-transition">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

"use client";

import React from "react";
import Image from "next/image";

interface Product {
  id: string | number;
  name: string;
  category: string;
  image?: string;
}

interface MarqueeProps {
  items: Product[];
  title?: string;
}

export function Marquee({ items, title = "Nuevos lanzamientos" }: MarqueeProps) {
  return (
    <section
      style={{
        padding: "var(--space-20) 0",
        background: "linear-gradient(to bottom, var(--color-bg-base) 0%, var(--color-bg-muted) 15%, var(--color-bg-muted) 85%, var(--color-bg-base) 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ padding: "0 var(--space-8)", maxWidth: "var(--container-xl)", margin: "0 auto", marginBottom: "var(--space-10)" }}>
        <h2 style={{
          fontSize: "1.1rem", // Aumentado ~25% (era xs)
          letterSpacing: "var(--tracking-widest)",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          fontWeight: "var(--weight-semibold)",
        }}>{title}</h2>
      </div>

      <div 
        style={{ 
          overflowX: "auto", 
          width: "100%",
          cursor: "grab",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        className="hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div
          className="marquee-container"
          style={{
            display: "flex",
            gap: "var(--space-6)",
            width: "max-content",
            animation: "marquee 40s linear infinite",
            padding: "0 var(--space-8)"
          }}
        >
          {[...items, ...items].map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              style={{
                width: "320px",
                height: "440px",
                background: "var(--color-surface-1)",
                borderRadius: "var(--radius-xl)",
                border: "1.5px solid var(--color-border-subtle)",
                display: "flex",
                flexDirection: "column",
                padding: "var(--space-6)",
                boxShadow: "var(--shadow-sm)",
                flexShrink: 0
              }}
            >
              <div
                style={{
                  aspectRatio: "1/1",
                  background: "var(--color-surface-2)",
                  borderRadius: "var(--radius-lg)",
                  marginBottom: "var(--space-6)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {(product as any).image ? (
                  <Image 
                    src={(product as any).image} 
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--color-text-disabled)" }}>
                    <div style={{ width: "100px", height: "100px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)" }} />
                  </div>
                )}
              </div>
              <div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
                  {product.category}
                </span>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)", marginTop: "var(--space-1)" }}>
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

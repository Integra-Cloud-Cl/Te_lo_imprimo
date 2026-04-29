"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

// Utility to create a URL-friendly slug
const slugify = (text: string) => 
  text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export function Marquee({ items, title = "Nuevos lanzamientos" }: MarqueeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "var(--space-20) 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ 
        padding: "0 var(--space-8)", 
        maxWidth: "var(--container-xl)", 
        margin: "0 auto", 
        marginBottom: "var(--space-10)" 
      }}>
        <h2 style={{
          fontSize: "1.1rem",
          letterSpacing: "var(--tracking-widest)",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          fontWeight: "var(--weight-semibold)",
        }}>{title}</h2>
      </div>

      <div 
        style={{ 
          overflowX: "hidden", 
          width: "100%",
          cursor: "default",
        }}
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            gap: var(--space-6);
            width: max-content;
            animation: marquee 60s linear infinite;
            padding: var(--space-4) var(--space-8);
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div
          className="marquee-track"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {[...items, ...items].map((product, i) => {
            const isHovered = hoveredIndex === i;
            const isAnythingHovered = hoveredIndex !== null;
            const productSlug = slugify(product.name);

            return (
              <Link 
                key={`${product.id}-${i}`}
                href={`/producto/${productSlug}`}
                aria-label={`Ver producto: ${product.name}`}
                onMouseEnter={() => setHoveredIndex(i)}
                style={{ textDecoration: "none", display: "block" }}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : isAnythingHovered ? 0.97 : 1,
                    opacity: isHovered ? 1 : isAnythingHovered ? 0.6 : 1,
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  style={{
                    width: "320px",
                    height: "460px",
                    background: "var(--color-surface-1)",
                    borderRadius: "var(--radius-xl)",
                    border: isHovered 
                      ? "1.5px solid var(--color-accent)" 
                      : "1.5px solid var(--color-border-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "var(--space-6)",
                    boxShadow: isHovered ? "var(--shadow-xl)" : "var(--shadow-sm)",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: isHovered ? 10 : 1,
                    transition: "border-color 0.3s ease",
                    cursor: "pointer"
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
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        sizes="320px"
                        priority={i < 4}
                        style={{ 
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                          transform: isHovered ? "scale(1.08)" : "scale(1)"
                        }}
                      />
                    ) : (
                      <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--color-text-disabled)" }}>
                        <div style={{ width: "100px", height: "100px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)" }} />
                      </div>
                    )}

                    {/* Overlay "Ver producto" */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(4px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2
                          }}
                        >
                          <div style={{
                            background: "var(--color-accent)",
                            color: "#FFFFFF",
                            padding: "var(--space-3) var(--space-6)",
                            borderRadius: "var(--radius-full)",
                            fontWeight: "var(--weight-bold)",
                            fontSize: "var(--text-sm)",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            boxShadow: "0 4px 15px rgba(232, 66, 10, 0.3)"
                          }}
                          >
                            Ver producto
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <span style={{ 
                      fontSize: "var(--text-xs)", 
                      color: isHovered ? "var(--color-accent)" : "var(--color-text-tertiary)", 
                      textTransform: "uppercase", 
                      letterSpacing: "var(--tracking-wide)",
                      fontWeight: "var(--weight-bold)",
                      transition: "color 0.3s ease"
                    }}>
                      {product.category}
                    </span>
                    <h3 style={{ 
                      fontSize: "var(--text-lg)", 
                      fontWeight: "var(--weight-semibold)", 
                      color: "var(--color-text-primary)", 
                      marginTop: "var(--space-1)",
                      lineHeight: 1.3
                    }}>
                      {product.name}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

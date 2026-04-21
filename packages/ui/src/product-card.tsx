"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  material: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  addItem: (product: any) => void;
  formatCLP: (price: number) => string;
  index: number;
  onClick: () => void;
}

export function ProductCard({ product, addItem, formatCLP, index, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ 
        background: "var(--color-surface-1)", 
        borderRadius: "20px", 
        border: "1px solid var(--color-border-subtle)", 
        overflow: "hidden", 
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ aspectRatio: "1/1", background: "var(--color-surface-2)", position: "relative" }}>
        <Image 
          src={product.image} 
          alt={`Imagen de producto: ${product.name}`} 
          fill 
          style={{ objectFit: "cover" }}
          priority={index < 3}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{product.name}</h3>
        <p style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: "15px" }}>{product.material}</p>
        
        <div style={{ marginTop: "auto" }}>
          <motion.button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); addItem(product); }}
            aria-label={`Añadir ${product.name} al carrito`}
            style={{ 
              width: "100%", 
              background: isHovered ? "var(--color-accent)" : "transparent", 
              color: isHovered ? "white" : "var(--color-text-primary)", 
              border: "2px solid var(--color-accent)", 
              padding: "12px", 
              borderRadius: "8px", 
              fontWeight: "bold", 
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s"
            }}
          >
            {isHovered ? "Añadir al carrito" : formatCLP(product.price)}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

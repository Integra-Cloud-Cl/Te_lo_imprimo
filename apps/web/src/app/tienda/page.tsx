"use client";

import { useState, useEffect } from "react";
import { Header, useCart, Footer, ProductCard } from "@repo/ui";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { addItem } = useCart();
  const selectedProduct = PRODUCTS.find(p => p.id === selectedId);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedId]);

  const filteredProducts = PRODUCTS.filter((product) =>
    activeCategory === "Todos" ? true : product.category === activeCategory
  );

  const formatCLP = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
      <Header />

      <main style={{ padding: "140px 20px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", marginBottom: "16px" }}>Tienda</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--color-text-secondary)", maxWidth: "600px" }}>
            Explora nuestra colección de objetos bajo demanda. Diseñados matemáticamente y fabricados con polímeros sostenibles.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "50px", flexWrap: "wrap" }}>
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-label={`Filtrar por ${category}`}
                aria-pressed={isActive}
                whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "8px 24px",
                  borderRadius: "20px",
                  border: isActive ? "1.5px solid var(--color-accent)" : "1.5px solid var(--color-border-subtle)",
                  background: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "white" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              formatCLP={formatCLP} 
              addItem={addItem} 
              onClick={() => setSelectedId(product.id)} 
            />
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProduct && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: "20px" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: "relative", background: "var(--color-bg-base)", width: "100%", maxWidth: "900px", borderRadius: "24px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ aspectRatio: "1/1", position: "relative" }}>
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{selectedProduct.name}</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "30px" }}>{selectedProduct.description}</p>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}>{formatCLP(selectedProduct.price)}</div>
                <button onClick={() => addItem(selectedProduct)} aria-label={`Añadir ${selectedProduct.name} al carrito`} style={{ background: "var(--color-accent)", color: "white", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Añadir al carrito</button>
                <button onClick={() => setSelectedId(null)} aria-label="Cerrar modal" style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "var(--color-text-primary)", cursor: "pointer", fontSize: "1.5rem" }}>✕</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

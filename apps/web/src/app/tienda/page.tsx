"use client";

import { useState, useEffect } from "react";
import { Header, useCart, Footer } from "@repo/ui";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Mock Data
const PRODUCTS = [
  {
    "id": "p1",
    "name": "Batman para pantalla",
    "image": "/images/batman-para-pantalla_11x7x8_5.990.jpeg",
    "material": "Impresión 3D",
    "description": "Tamaño: 11x7x8",
    "price": 5990,
    "category": "Geek"
  },
  {
    "id": "p2",
    "name": "Cubo para lápices con patas articuladas",
    "image": "/images/cubo-para-lápices-con-patas-articuladas_20x16x10.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 20x16x10",
    "price": 5990,
    "category": "Organización"
  },
  {
    "id": "p3",
    "name": "Diseño de soporte para auriculares",
    "image": "/images/diseño-de-soporte-para-auriculares_21x21x11.5_8.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 21x21x11.5",
    "price": 8990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p4",
    "name": "Maceta Esférica con Soporte",
    "image": "/images/maceta-esférica-con-soporte_10x10x8_7.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 10x10x8",
    "price": 7990,
    "category": "Plantas y Macetas"
  },
  {
    "id": "p5",
    "name": "Macetero de piedra",
    "image": "/images/macetero-de-piedra_10x9.5x5_5.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 10x9.5x5",
    "price": 5990,
    "category": "Plantas y Macetas"
  },
  {
    "id": "p6",
    "name": "Mamá, Te queremos",
    "image": "/images/mamá-te-queremos_16x5x2_4.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 16x5x2",
    "price": 4990,
    "category": "Accesorios"
  },
  {
    "id": "p7",
    "name": "Marco Barroco",
    "image": "/images/marco-barroco_24x19x1.6_12.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 24x19x1.6",
    "price": 12990,
    "category": "Arte y Figuras"
  },
  {
    "id": "p8",
    "name": "Organizador de Escritorio Inclinado",
    "image": "/images/organizador-de-escritorio-inclinado_12x11x8_6.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 12x11x8",
    "price": 6990,
    "category": "Organización"
  },
  {
    "id": "p9",
    "name": "Organizador de Escritorio",
    "image": "/images/organizador-de-escritorio_10x18x11.5_7.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 10x18x11.5",
    "price": 7990,
    "category": "Organización"
  },
  {
    "id": "p10",
    "name": "Organizador de escritorio - Rana",
    "image": "/images/organizador-de-escritorio---rana_12x9x8_7.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 12x9x8",
    "price": 7990,
    "category": "Organización"
  },
  {
    "id": "p11",
    "name": "Organizador de mesa con soporte para teléfono",
    "image": "/images/organizador-de-mesa-con-soporte-para-teléfono_21x8x8_9.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 21x8x8",
    "price": 9990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p12",
    "name": "Porta-bolígrafos de calavera",
    "image": "/images/porta-bolígrafos-de-calavera_8.5x12x10_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 8.5x12x10",
    "price": 8990,
    "category": "Arte y Figuras"
  },
  {
    "id": "p13",
    "name": "Portalápices modular",
    "image": "/images/portalápices-modular_107.5x8_6.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 107.5x8",
    "price": 6990,
    "category": "Organización"
  },
  {
    "id": "p14",
    "name": "Posavasos Geométricos",
    "image": "/images/posavasos-geométricos_10.5x10.5x1.2_10.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 10.5x10.5x1.2",
    "price": 10990,
    "category": "Accesorios"
  },
  {
    "id": "p15",
    "name": "Soporte Dual para ps5 (02)",
    "image": "/images/soporte-dual-para-ps5-02_12x17.5x6.5_5.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 12x17.5x6.5",
    "price": 5990,
    "category": "Gaming"
  },
  {
    "id": "p16",
    "name": "Soporte Dual para ps5",
    "image": "/images/soporte-dual-para-ps5_12x17.5x6.5_5.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 12x17.5x6.5",
    "price": 5990,
    "category": "Gaming"
  },
  {
    "id": "p17",
    "name": "Soporte de teléfono Brazo robótico",
    "image": "/images/soporte-de-teléfono-brazo-robótico_13x15x10_10.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 13x15x10",
    "price": 10990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p18",
    "name": "Soporte doble para gafas",
    "image": "/images/soporte-doble-para-gafas_11.5x7x15_6.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 11.5x7x15",
    "price": 6990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p19",
    "name": "Soporte para auriculares de diseño moderno",
    "image": "/images/soporte-para-auriculares-de-diseño-moderno_9.5x7x2.5_5.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 9.5x7x2.5",
    "price": 5990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p20",
    "name": "Soporte para auriculares",
    "image": "/images/soporte-para-auriculares_22x12x6.5_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 22x12x6.5",
    "price": 8990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p21",
    "name": "Soporte para bolígrafos - Bolsa de papel",
    "image": "/images/soporte-para-bolígrafos---bolsa-de-papel_8x8.5x10_8.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 8x8.5x10",
    "price": 8990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p22",
    "name": "Soporte para bolígrafos tipo barrera Jersey",
    "image": "/images/soporte-para-bolígrafos-tipo-barrera-jersey_7x17x12_6.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 7x17x12",
    "price": 6990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p23",
    "name": "Soporte para dos mandos PS5",
    "image": "/images/soporte-para-dos-mandos-ps5_18x22x7_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 18x22x7",
    "price": 8990,
    "category": "Gaming"
  },
  {
    "id": "p24",
    "name": "Soporte para portátil Laptop Stand2",
    "image": "/images/soporte-para-portátil-laptop-stand2_21x21x4_6.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 21x21x4",
    "price": 6990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p25",
    "name": "Soporte para portátil Laptop Stand",
    "image": "/images/soporte-para-portátil-laptop-stand_21x21x4_6.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 21x21x4",
    "price": 6990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p26",
    "name": "alza monitor",
    "image": "/images/alza-monitor_21x13x3_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 21x13x3",
    "price": 8990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p27",
    "name": "caja uno2",
    "image": "/images/caja-uno2_4.5x9x10.5_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 4.5x9x10.5",
    "price": 8990,
    "category": "Organización"
  },
  {
    "id": "p28",
    "name": "caja uno",
    "image": "/images/caja-uno_4.5x9x10.5_8.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 4.5x9x10.5",
    "price": 8990,
    "category": "Organización"
  },
  {
    "id": "p29",
    "name": "calavera monitor",
    "image": "/images/calavera-monitor_4x5x4_4.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 4x5x4",
    "price": 4990,
    "category": "Arte y Figuras"
  },
  {
    "id": "p30",
    "name": "nombre personalizado",
    "image": "/images/nombre-personalizado_16x17x5_6.990.png",
    "material": "Impresión 3D",
    "description": "Tamaño: 16x17x5",
    "price": 6990,
    "category": "Arte y Figuras"
  },
  {
    "id": "p31",
    "name": "set Piedras Gruñonas",
    "image": "/images/set-piedras-gruñonas_6x5x4_7.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 6x5x4",
    "price": 7990,
    "category": "Arte y Figuras"
  },
  {
    "id": "p32",
    "name": "soporte ajustable audifonos2",
    "image": "/images/soporte-ajustable-audifonos2_11x6.5x4_4.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 11x6.5x4",
    "price": 4990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p33",
    "name": "soporte ajustable audifonos",
    "image": "/images/soporte-ajustable-audifonos_11x6.5x4_4.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 11x6.5x4",
    "price": 4990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p34",
    "name": "soporte de portátil",
    "image": "/images/soporte-de-portátil_5x9x6_7.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 5x9x6",
    "price": 7990,
    "category": "Soportes y Bases"
  },
  {
    "id": "p35",
    "name": "soporte play 5",
    "image": "/images/soporte-play-5_6x5.7x6.5_6.990.jpg",
    "material": "Impresión 3D",
    "description": "Tamaño: 6x5.7x6.5",
    "price": 6990,
    "category": "Gaming"
  }
];

const CATEGORIES = ["Todos","Decoración","Oficina","Iluminación","Plantas y Macetas","Geek","Soportes y Bases","Coleccionables","Gaming","Organización","Accesorios","Arte y Figuras"];

function ProductCard({ product, addItem, formatCLP, index, onClick }: any) {
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

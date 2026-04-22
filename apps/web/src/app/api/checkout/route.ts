import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

// ── MercadoPago ──────────────────────────────────────────────────────────────
const mpAccessToken = process.env.MP_ACCESS_TOKEN ?? "";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface CustomerData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  comuna: string;
}

interface CheckoutBody {
  items: CartItem[];
  customer: CustomerData;
  totals: { subtotal: number; shipping: number; total: number };
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, customer, totals } = body;

    // Validaciones básicas
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }
    if (!customer?.email || !customer?.nombre) {
      return NextResponse.json({ error: "Datos del cliente incompletos" }, { status: 400 });
    }

    // Generar ID único de orden en el servidor (más seguro que el cliente)
    const orderId = `TLI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // ── 1. Guardar orden en Supabase con estado pending_payment ──────────────
    const isSupabaseConfigured = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);

    if (isSupabaseConfigured) {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      );
      const { error: dbError } = await supabase.from("orders").insert({
        order_id: orderId,
        status: "pending_payment",
        customer,
        items,
        totals,
      });

      if (dbError) {
        console.error("❌ Supabase insert error:", dbError.message);
        // No bloqueamos el flujo — la orden continuará aunque Supabase falle
      } else {
        console.log(`✅ Orden ${orderId} guardada en Supabase.`);
      }

      // Upsert del cliente también
      await supabase.from("clientes").upsert(
        {
          nombre: customer.nombre,
          email: customer.email,
          telefono: customer.telefono,
          fecha_compra: new Date().toISOString(),
        },
        { onConflict: "email" }
      );
    } else {
      console.warn("⚠️ Supabase no configurado — omitiendo persistencia.");
    }

    // ── 2. Crear Preferencia en MercadoPago ──────────────────────────────────
    if (!mpAccessToken || mpAccessToken === "YOUR_ACCESS_TOKEN") {
      // Modo demo: sin token real, devolver redirect de prueba
      console.warn("⚠️ MP_ACCESS_TOKEN no configurado — modo demo activado.");
      return NextResponse.json({
        init_point: `${baseUrl}/order-status?status=approved&external_reference=${orderId}&demo=true`,
        orderId,
        demo: true,
      });
    }

    const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
    const preference = new Preference(client);

    // Mapear items al formato de MP
    const mpItems = items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "CLP",
      description: item.category ?? "Objeto Impreso en 3D",
    }));

    // Agregar costo de envío como ítem adicional si aplica
    if (totals.shipping > 0) {
      mpItems.push({
        id: "SHIPPING",
        title: "Costo de Envío",
        quantity: 1,
        unit_price: totals.shipping,
        currency_id: "CLP",
        description: "Envío a domicilio",
      });
    }

    const result = await preference.create({
      body: {
        items: mpItems,
        external_reference: orderId,
        payer: {
          name: customer.nombre.split(" ")[0],
          surname: customer.nombre.split(" ").slice(1).join(" "),
          email: customer.email,
          phone: { number: customer.telefono },
          address: { street_name: customer.direccion },
        },
        back_urls: {
          success: `${baseUrl}/order-status`,
          failure: `${baseUrl}/order-status`,
          pending: `${baseUrl}/order-status`,
        },
        auto_return: "approved",
        statement_descriptor: "TE LO IMPRIMO",
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
      orderId,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error en /api/checkout:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

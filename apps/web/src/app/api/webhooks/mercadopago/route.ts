import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

// ── MercadoPago ──────────────────────────────────────────────────────────────
const mpAccessToken = process.env.MP_ACCESS_TOKEN ?? "";

// ── EmailJS REST API ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_CLIENT = process.env.EMAILJS_TEMPLATE_CLIENT ?? "";
const EMAILJS_TEMPLATE_OWNER = process.env.EMAILJS_TEMPLATE_OWNER ?? "";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";

async function sendEmail(templateId: string, params: Record<string, string>) {
  if (!EMAILJS_PRIVATE_KEY || EMAILJS_PRIVATE_KEY === "") {
    console.warn("⚠️ EmailJS: EMAILJS_PRIVATE_KEY no configurada. Email omitido.");
    return;
  }
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: templateId,
        user_id: EMAILJS_PRIVATE_KEY,
        template_params: params,
      }),
    });
    console.log(`✅ Email enviado con template ${templateId}`);
  } catch (err) {
    console.error("❌ Error enviando email:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // MercadoPago solo nos importa el evento "payment"
    if (type !== "payment") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const paymentId = data?.id;
    if (!paymentId) {
      return NextResponse.json({ error: "payment id missing" }, { status: 400 });
    }

    // ── Consultar estado real del pago a la API de MP ────────────────────────
    if (!mpAccessToken || mpAccessToken === "YOUR_ACCESS_TOKEN") {
      console.warn("⚠️ MP_ACCESS_TOKEN no configurado — ignorando webhook.");
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    const paymentStatus = payment.status; // "approved" | "pending" | "rejected"
    const orderId = payment.external_reference;

    console.log(`📦 Webhook MP: payment=${paymentId} status=${paymentStatus} order=${orderId}`);

    if (!orderId) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // ── Actualizar orden en Supabase ─────────────────────────────────────────
    const newStatus =
      paymentStatus === "approved"
        ? "pagado"
        : paymentStatus === "pending"
        ? "pendiente"
        : "rechazado";

    const supabase = createClient(
      process.env.SUPABASE_URL ?? "https://placeholder.supabase.co",
      process.env.SUPABASE_SERVICE_KEY ?? "placeholder"
    );

    const { data: orderData, error: updateError } = await supabase
      .from("orders")
      .update({
        status: newStatus,
        mp_payment_id: String(paymentId),
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId)
      .select("*")
      .single();

    if (updateError) {
      console.error("❌ Error actualizando orden en Supabase:", updateError.message);
    } else {
      console.log(`✅ Orden ${orderId} actualizada a "${newStatus}".`);
    }

    // ── Disparar emails solo si el pago fue aprobado ─────────────────────────
    if (paymentStatus === "approved" && orderData) {
      const customer = orderData.customer;
      const totals = orderData.totals;
      const items = orderData.items;

      const formatCLP = (n: number) =>
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          maximumFractionDigits: 0,
        }).format(n);

      const itemsList = items
        .map((i: { name: string; quantity: number; price: number }) =>
          `- ${i.name} (x${i.quantity}): ${formatCLP(i.price * i.quantity)}`
        )
        .join("\n");

      const templateParams = {
        order_id: orderId,
        customer_name: customer.nombre,
        customer_email: customer.email,
        customer_phone: customer.telefono,
        address: customer.direccion,
        comuna: customer.comuna,
        total: formatCLP(totals.total),
        items_html: itemsList,
      };

      // Enviar email al cliente y al dueño
      await Promise.all([
        sendEmail(EMAILJS_TEMPLATE_CLIENT, templateParams),
        sendEmail(EMAILJS_TEMPLATE_OWNER, templateParams),
      ]);
    }

    // Siempre responder 200 para que MP no reintente el webhook
    return NextResponse.json({ received: true, status: newStatus }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error en Webhook:", message);
    // Igual respondemos 200 para no causar reintentos de MP
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

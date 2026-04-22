import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import express from 'express';
import cors from 'cors';
import { supabase } from './supabase';

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// ── MercadoPago ──────────────────────────────────────────────────────────────
const mpAccessToken = process.env.MP_ACCESS_TOKEN || '';
const client = new MercadoPagoConfig({ accessToken: mpAccessToken });

app.get('/', (_req, res) => {
  res.json({ status: 'API TeLoImprimo running', mp: mpAccessToken ? 'configured' : 'demo-mode' });
});

// Endpoint 1: Crear orden en Supabase
app.post('/create-order', async (req, res) => {
  try {
    const { orderId, customer, items, totals } = req.body;

    if (!orderId || !customer || !items) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const isSupabaseConfigured = !!(process.env.SUPABASE_URL && process.env.SUPABASE_KEY);

    if (isSupabaseConfigured) {
      await supabase.from('orders').insert({
        order_id: orderId,
        status: 'pending_payment',
        customer,
        items,
        totals,
      });

      await supabase.from('clientes').upsert(
        { nombre: customer.nombre, email: customer.email, telefono: customer.telefono, fecha_compra: new Date().toISOString() },
        { onConflict: 'email' }
      );
    }

    return res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno' });
  }
});

// Endpoint 2: Crear preferencia de MercadoPago
app.post('/create-preference', async (req, res) => {
  try {
    const { items, totals, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    if (!mpAccessToken) {
      return res.status(200).json({
        init_point: `${baseUrl}/order-status?status=approved&external_reference=${orderId}&demo=true`,
        mocked: true,
      });
    }

    const mpItems = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'CLP',
      description: item.category || 'Objeto Impreso en 3D',
    }));

    if (totals?.shipping > 0) {
      mpItems.push({ id: 'SHIPPING', title: 'Envío', quantity: 1, unit_price: totals.shipping, currency_id: 'CLP' });
    }

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: mpItems,
        external_reference: orderId,
        back_urls: {
          success: `${baseUrl}/order-status`,
          failure: `${baseUrl}/order-status`,
          pending: `${baseUrl}/order-status`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      },
    });

    return res.status(200).json({ init_point: result.init_point });

  } catch (error) {
    console.error('Error generando preferencia:', error);
    return res.status(200).json({
      init_point: `${baseUrl}/order-status?status=approved&demo=true`,
      mocked: true,
    });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port} | MP: ${mpAccessToken ? 'live' : 'demo'}`);
});

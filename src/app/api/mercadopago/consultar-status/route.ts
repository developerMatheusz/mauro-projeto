import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { paymentId } = await req.json();

  const response = await axios.get(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    }
  );

  const status = response.data.status;

  return NextResponse.json({ status });
}

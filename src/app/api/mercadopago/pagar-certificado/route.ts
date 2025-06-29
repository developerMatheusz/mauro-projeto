import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();
  const { cpf } = body;

  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  try {
    const idempotencyKey = crypto.randomUUID();

    const response = await axios.post(
      'https://api.mercadopago.com/v1/payments',
      {
        transaction_amount: 29.9,
        description: `Certificado CPF ${cpf}`,
        payment_method_id: 'pix',
        payer: {
          email: `${cpf}@exemplo.com`,
          first_name: `Usuário ${cpf}`,
          identification: {
            type: 'CPF',
            number: cpf
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey
        }
      }
    );

    return NextResponse.json({ payment: response.data });
  } catch (error: any) {
    console.error(
      'Erro ao criar pagamento PIX:',
      error.response?.data || error
    );
    return NextResponse.json(
      { error: 'Erro ao criar pagamento Pix' },
      { status: 500 }
    );
  }
}

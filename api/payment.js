import { LavaClient, Currency } from 'lava-top-sdk';

const client = new LavaClient({
  apiKey: process.env.LAVA_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.LAVA_API_KEY) {
    return res.status(500).json({ error: 'LAVA_API_KEY is not configured on the server.' });
  }

  try {
    const { email, offerId, currency } = req.body || {};

    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }

    if (typeof offerId !== 'string' || !offerId.trim()) {
      return res.status(400).json({ error: 'A valid offerId is required.' });
    }

    const payment = await client.createOneTimePayment({
      email: 'customer@example.com',
      offerId: 'your-offer-id',
      currency: Currency.USD, // or Currency.EUR
    });

    // Redirect to payment page if paymentUrl is provided
    if (payment.paymentUrl) {
      window.location.href = payment.paymentUrl;
    }

    return res.status(200).json(payment);
    
  } catch (error) {
    console.error('Lava SDK Error:', error);
    return res.status(
      
      500).json({ error: 'Internal Server Error' });
  }
}
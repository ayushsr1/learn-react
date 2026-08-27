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
    const { email, currency } = req.body || {};

    if (!email || !currency) {
      return res.status(400).json({ error: 'email and currency are required.' });
    }

    const payment = await client.createOneTimePayment({
      email,
      currency: Currency.USD, // Change to your currency (e.g., RUB, EUR)
    });

    return res.status(200).json(payment);
  } catch (error) {
    console.error('Lava SDK Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
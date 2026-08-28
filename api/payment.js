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
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'email and currency are required.' });
    }

    const payment = await client.createOneTimePayment({
      email,
      offerId:'3356ba84-d350-4cc0-b167-2eda31e72782',
      currency: Currency.USD, // Change to your currency (e.g., RUB, EUR)
    });

    return res.status(200).json(payment);
    
  } catch (error) {
    console.error('Lava SDK Error:', error);
    return res.status(
      
      500).json({ error: 'Internal Server Error' });
  }
}
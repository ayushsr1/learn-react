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

    const payment = await client.createOneTimePayment({
      offerId:'8acfaa63-1178-4b37-8743-594aca8a33e8',
      currency: Currency.USD, // Change to your currency (e.g., RUB, EUR)
      amount: 20
    });

    return res.status(200).json(payment);
    
  } catch (error) {
    console.error('Lava SDK Error:', error);
    return res.status(
      
      500).json({ error: 'Internal Server Error' });
  }
}
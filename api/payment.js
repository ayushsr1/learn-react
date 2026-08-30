import { LavaClient, Currency } from 'lava-top-sdk';

const client = new LavaClient({ apiKey: process.env.LAVA_API_KEY });

// hardcoded HERE, not in FE
const OFFER_ID = process.env.LAVA_OFFER_ID; // set this in Vercel env: 8acfaa63-1178-4b37-8743-594aca8a33e8
const CURRENCY = Currency.USD; // lock it, don't take from FE

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { email } = req.body;
    if (!email?.trim()) return res.status(400).json({ error: 'Email required' });

    const payment = await client.createOneTimePayment(
      email.trim().toLowerCase(),
      OFFER_ID,
      CURRENCY
    );

    return res.status(200).json(payment);

  } catch (error) {
    console.error('LAVA ERROR:', error.response?.data || error.message);
    return res.status(400).json({ 
      error: error.response?.data?.error || 'Payment creation failed' 
    });
  }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { email } = req.body;
    if (!email?.trim()) return res.status(400).json({ error: 'Email required' });

    const OFFER_ID = process.env.LAVA_OFFER_ID; 
    const API_KEY = process.env.LAVA_API_KEY;
    const AMOUNT = 20;

    // EXACT same call as your Swagger screenshot
    const lavaRes = await fetch('https://gate.lava.top/api/v3/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        offerId: OFFER_ID,
        currency: 'USD',
        amount: AMOUNT
        // add this if needed, swagger was sending it implicitly
        // buyerLanguage: 'EN'
      }),
    });

    const data = await lavaRes.json();

    if (!lavaRes.ok) {
      console.error('LAVA API ERROR:', data);
      return res.status(lavaRes.status).json({ error: data.error || 'Lava error', details: data });
    }

    // data has { id, status, paymentUrl, amountTotal ... } exactly like your screenshot
    return res.status(200).json(data);

  } catch (error) {
    console.error('SERVER ERROR:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
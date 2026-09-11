// Vercel serverless function — keeps your Anthropic API key server-side.
// The browser calls /api/claude; this forwards the request to Anthropic
// with the real key attached, so the key never ships to the client.
//
// Setup:
//   1. Get a key at https://console.anthropic.com (Settings > API Keys).
//   2. In your Vercel project: Settings > Environment Variables >
//      add ANTHROPIC_API_KEY = <your key> (Production + Preview).
//   3. Redeploy. That's it — no other config needed, Vercel auto-detects
//      any file under /api as a serverless function.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server.' });
    return;
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy request failed', detail: String(err) });
  }
}

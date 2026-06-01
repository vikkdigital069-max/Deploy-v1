export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

  const { name, htmlContent } = JSON.parse(req.body);
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

  try {
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        files: [{ file: 'index.html', data: htmlContent, encoding: 'utf-8' }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error.message });

    res.status(200).json({ url: data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

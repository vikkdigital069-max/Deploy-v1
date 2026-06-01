export default async function handler(req, res) {
  // Ambil API Key dari Environment Variable (Setting > Environment Variables di Vercel)
  const apiKey = process.env.VERCEL_API_TOKEN;
  
  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body);
    
    // Logika backend untuk memproses deploy ke Vercel menggunakan API Key
    res.status(200).json({ 
        status: 'success', 
        url: `https://${name}.vercel.app` 
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


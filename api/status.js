import fetch from 'node-fetch';

const SERVER_IP   = '173.212.194.106';
const SERVER_PORT = 22003;
const ASE_PORT    = SERVER_PORT + 123;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = `http://173.212.194.106:22005/%5BKS%5Dsite/status.json`;
    const r   = await fetch(url);
    if (!r.ok) {
      return res.status(500).json({ error: 'Erro na mtasa-api', code: r.status });
    }
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao ligar ao servidor' });
  }
}

// api/status.js
import fetch from 'node-fetch';

const SERVER_IP   = '173.212.194.106';
const SERVER_PORT = 22003;
const ASE_PORT    = SERVER_PORT + 123; // 22126

export default async function handler(req, res) {
  // CORS aberto para poderes chamar a partir de qualquer site [web:188][web:192]
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = `https://mtasa-api.com/server/?ip=${SERVER_IP}&asePort=${ASE_PORT}`;
    const r   = await fetch(url);
    if (!r.ok) {
      return res.status(500).json({ error: 'Erro na mtasa-api', code: r.status });
    }
    const data = await r.json(); // estrutura documentada na mtasa-api [web:101][web:116]
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao ligar ao servidor' });
  }
}

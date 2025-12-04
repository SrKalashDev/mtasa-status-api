import { getServerInfo } from '@bsnext/mta-ase-query';

const SERVER_IP   = '173.212.194.106';
const SERVER_PORT = 22003;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const info = await getServerInfo(SERVER_IP, SERVER_PORT); // ASE query direto [web:301]

    // Normaliza para o formato que o teu site já usa
    const data = {
      name:        info.name,
      playerCount: info.players,
      playerSlots: info.max_players,
      mapName:     info.map,
      version:     info.version,
      passworded:  info.private,
      players:     info.players_list.map(p => ({
        name: p.name,
        ping: p.ping
      }))
    };

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao consultar ASE', detail: String(e) });
  }
}

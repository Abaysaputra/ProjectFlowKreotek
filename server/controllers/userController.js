import { User } from '../models/index.js';

export const getClients = async (req, res) => {
  console.log("✅ getClients dipanggil"); // ⬅️ Tambahkan ini
  try {
    const clients = await User.findAll({ where: { role: 'client' } });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
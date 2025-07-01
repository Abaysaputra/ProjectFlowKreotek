import { User } from '../models/index.js';

export const getClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: { role: 'client' },
      attributes: ['id', 'name'],
    });
    console.log('✅ Clients:', clients); // LOG
    res.json(clients);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: error.message });
  }
};

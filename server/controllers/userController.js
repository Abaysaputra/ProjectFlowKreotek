import { User } from '../models/index.js';

export const getClients = async (req, res) => {
  console.log("✅ getClients dipanggil"); 
  try {
    const clients = await User.findAll({ where: { role: 'client' } });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createClient = async (req, res) => {
  try {
    const { name, email, password } = req.body; 

    if (!password) {
      return res.status(400).json({ message: 'Password harus diisi' });
    }

    const newClient = await User.create({
      name,
      email,
      password,
      role: 'client'
    });

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

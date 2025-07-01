import { Project, User } from '../models/index.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: User,
        as: 'client',
        attributes: ['id', 'name', 'email']
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, client_id, status, deadline, description } = req.body;

    const client = await User.findOne({ where: { id: client_id, role: 'client' } });
    if (!client) {
      return res.status(400).json({ message: 'Client ID tidak valid atau bukan role client.' });
    }

    const newProject = await Project.create({
      name,
      client_id,
      status,
      deadline,
      description
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

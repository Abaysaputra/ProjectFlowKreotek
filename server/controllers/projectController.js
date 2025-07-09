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

/**
 * Update project status only (PATCH)
 */
export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project tidak ditemukan.' });
    }

    project.status = status;
    await project.save();

    res.json({ message: 'Status proyek berhasil diperbarui.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Edit full project data (PUT)
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, deadline, description } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project tidak ditemukan.' });
    }

    await project.update({
      name,
      status,
      deadline,
      description
    });
    if (isNaN(id)) {
  return res.status(400).json({ message: 'ID tidak valid' });
  }
    res.json({ message: 'Data proyek berhasil diperbarui.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete project
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project tidak ditemukan.' });
    }

    await project.destroy();
    res.json({ message: 'Proyek berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

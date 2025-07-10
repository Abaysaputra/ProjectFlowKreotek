import { Project, User, ProjectMember } from '../models/index.js';
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'client', 
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'members', 
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] } 
        }
      ],
      order: [['createdAt', 'DESC']] 
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

export const assignMember = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(user_id);
    if (!project || !user) return res.status(404).json({ message: 'Project atau User tidak ditemukan.' });

    await project.addMember(user);
    res.json({ message: 'Anggota berhasil ditambahkan.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'members',
        attributes: ['id', 'name', 'email']
      }
    });
    if (!project) return res.status(404).json({ message: "Proyek tidak ditemukan" });
    res.json(project.members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignUserToProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(userId);
    if (!project || !user) return res.status(404).json({ message: "Project atau User tidak ditemukan" });

    await project.addMember(user);
    res.json({ message: "User berhasil ditambahkan ke proyek" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unassignUserFromProject = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(userId);
    if (!project || !user) return res.status(404).json({ message: "Project atau User tidak ditemukan" });

    await project.removeMember(user);
    res.json({ message: "User berhasil dihapus dari proyek" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const removed = await ProjectMember.destroy({
      where: { project_id: projectId, user_id: userId }
    });

    if (removed) {
      return res.json({ message: 'Anggota berhasil dihapus dari proyek.' });
    } else {
      return res.status(404).json({ message: 'Anggota tidak ditemukan di proyek.' });
    }
  } catch (error) {
    console.error('Gagal menghapus anggota:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus anggota.' });
  }
};

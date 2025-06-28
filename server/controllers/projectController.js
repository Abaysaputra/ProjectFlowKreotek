import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

export const createProject = async (req, res) => {
  const { name, status, client_id, deadline, description } = req.body;
  const newProject = await Project.create({ name, status, client_id, deadline, description });
  res.status(201).json(newProject);
};

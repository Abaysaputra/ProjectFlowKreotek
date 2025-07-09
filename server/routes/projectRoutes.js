import express from 'express';
import { getProjects, createProject, updateProject, updateProjectStatus, deleteProject } from '../controllers/projectController.js';
const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.patch('/:id', updateProjectStatus); // PATCH hanya untuk status
router.delete('/:id', deleteProject);

export default router;

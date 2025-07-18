import express from 'express';
import {
    getProjects,
    createProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
    assignUserToProject,       
    unassignUserFromProject,   
    getProjectMembers,       
    removeMember,
    assignMember
} from "../controllers/projectController.js";


const router = express.Router();
router.post('/:id/members', assignMember);
router.delete('/:id/members/:userId', removeMember);
router.get('/:id/members', getProjectMembers);
router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.patch('/:id', updateProjectStatus); 
router.delete('/:id', deleteProject);
router.post('/:id/members', assignUserToProject);
router.delete('/:id/unassign/:userId', unassignUserFromProject);
router.get('/:id/members', getProjectMembers);
router.delete('/:projectId/members/:userId', removeMember);
export default router;

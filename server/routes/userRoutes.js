import express from 'express';
import { getClients, createClient } from '../controllers/userController.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/clients', getClients);
router.post('/clients', createClient);
router.get('/', getAllUsers); 
export default router;
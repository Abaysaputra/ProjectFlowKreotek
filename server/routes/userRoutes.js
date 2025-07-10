import express from 'express';
import { getClients, createClient } from '../controllers/userController.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// ✅ perbaiki path
router.get('/clients', getClients);
router.post('/clients', createClient);
router.get('/', getAllUsers); // GET /api/users
export default router;
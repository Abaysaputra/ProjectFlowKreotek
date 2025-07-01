import express from 'express';
import { getClients, createClient } from '../controllers/userController.js';


const router = express.Router();

// ✅ perbaiki path
router.get('/clients', getClients);
router.post('/clients', createClient);
export default router;
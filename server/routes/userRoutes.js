import express from 'express';
import { getClients } from '../controllers/userController.js';

const router = express.Router();

// ✅ perbaiki path
router.get('/clients', getClients);

export default router;
import express from 'express';
import { adminDashboard } from '../controllers/adminController.js';
import { ensureAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/dashboard', ensureAdmin, adminDashboard);

export default router;

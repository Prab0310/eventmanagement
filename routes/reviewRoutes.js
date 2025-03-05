import express from 'express';
import { addReview } from '../controllers/reviewController.js';
import { ensureAttendee } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/add', ensureAttendee, addReview);

export default router;

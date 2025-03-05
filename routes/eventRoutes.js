import express from 'express';
import { 
  renderCreateForm, 
  createNewEvent, 
  getEvents, 
  getEventDetails, 
  renderEditForm, 
  updateEvent, 
  deleteEvent,
  getOrganizerEvents 
} from '../controllers/eventController.js';
import { ensureOrganizer } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public route for all attendees
router.get('/', getEvents);

// Public route: view single event details
router.get('/event/:event_id', getEventDetails);

// Organizer-only routes
router.get('/manage', ensureOrganizer, getOrganizerEvents);
router.get('/create', ensureOrganizer, renderCreateForm);
router.post('/event/create', ensureOrganizer, createNewEvent);
router.get('/edit/:event_id', ensureOrganizer, renderEditForm);
router.post('/edit/:event_id', ensureOrganizer, updateEvent);
router.get('/delete/:event_id', ensureOrganizer, deleteEvent);



export default router;

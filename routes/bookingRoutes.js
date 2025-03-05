import express from 'express';
import { bookEvent } from '../controllers/bookingController.js';
import { ensureAttendee } from '../middleware/roleMiddleware.js';
import db from '../config/db.js'; 

const router = express.Router();

router.post('/book', ensureAttendee, bookEvent);

router.get('/my-tickets', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    const userId = req.session.user.user_id;

    try {
        const [bookings] = await db.execute(
            'SELECT b.*, e.title AS event_title, e.event_date FROM Bookings b JOIN Events e ON b.event_id = e.event_id WHERE b.user_id = ?',
            [userId]
        );

        res.render('myBookings', { user: req.session.user, bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving bookings');
    }
})



export default router;

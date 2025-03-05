// controllers/adminController.js
import { getAllEvents } from '../models/eventModel.js';
import db from '../config/db.js';

export const adminDashboard = (req, res) => {
  getAllEvents((err, events) => {
    if (err) return res.status(500).send('Error fetching events');
    
    const query = `
      SELECT E.title as event_title, U.name, U.email, A.registration_date 
      FROM Attendees A 
      JOIN Users U ON A.user_id = U.user_id 
      JOIN Events E ON A.event_id = E.event_id
    `;
    db.query(query, (err, attendees) => {
      if (err) return res.status(500).send('Error fetching attendees');
      res.render('adminDashboard', { events, attendees, user: req.session.user });
    });
  });
};

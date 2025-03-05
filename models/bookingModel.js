import db from '../config/db.js';

export const createBooking = (user_id, event_id, seat_number, payment_status, callback) => {
  const query = 'INSERT INTO Bookings (user_id, event_id, seat_number, payment_status) VALUES (?, ?, ?, ?)';
  db.execute(query, [user_id, event_id, seat_number, payment_status], callback);
};

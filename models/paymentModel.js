import db from '../config/db.js';

export const createPayment = (booking_id, amount, payment_method, status, callback) => {
  const query = 'INSERT INTO Payments (booking_id, amount, payment_method, status) VALUES (?, ?, ?, ?)';
  db.execute(query, [booking_id, amount, payment_method, status], callback);
};

import db from '../config/db.js';

export const createReview = (user_id, event_id, rating, comment, callback) => {
  const query = 'INSERT INTO Reviews (user_id, event_id, rating, comment) VALUES (?, ?, ?, ?)';
  db.execute(query, [user_id, event_id, rating, comment], callback);
};


// models/reviewModel.js
export const getReviewByUserAndEvent = (user_id, event_id, callback) => {
  const query = 'SELECT * FROM Reviews WHERE user_id = ? AND event_id = ?';
  db.execute(query, [user_id, event_id], callback);
};

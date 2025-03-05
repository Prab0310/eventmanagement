import db from '../config/db.js';

export const createEvent = (organizer_id, category_id, title, description, event_date, location, available_seats, price, callback) => {
    const query = 'INSERT INTO Events (organizer_id, category_id, title, description, event_date, location, available_seats, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    // Log the query and parameters for debugging
    console.log("Executing Query:", query);
    console.log("Parameters:", { organizer_id, category_id, title, description, event_date, location, available_seats, price });
    
    db.execute(query, [organizer_id, category_id, title, description, event_date, location, available_seats, price], (err, result) => {
      if (err) {
        console.error("DB Execute Error:", err);
      }
      callback(err, result);
    });
  };

export const getAllEvents = (callback) => {
  const query = 'SELECT * FROM Events';
  db.execute(query, [], callback);
};

export const getEventById = (event_id, callback) => {
  const query = 'SELECT * FROM Events WHERE event_id = ?';
  db.execute(query, [event_id], callback);
};

export const updateEvent = (event_id, updatedData, callback) => {
  const { category_id, title, description, event_date, location, available_seats, price } = updatedData;
  const query = 'UPDATE Events SET category_id = ?, title = ?, description = ?, event_date = ?, location = ?, available_seats = ?, price = ? WHERE event_id = ?';
  db.execute(query, [category_id, title, description, event_date, location, available_seats, price, event_id], callback);
};

export const deleteEvent = (event_id, callback) => {
  const query = 'DELETE FROM Events WHERE event_id = ?';
  db.execute(query, [event_id], callback);
};
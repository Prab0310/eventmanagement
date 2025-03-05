import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createUser = (name, email, password, role, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.execute(query, [name, email, hashedPassword, role], callback);
};

export const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM Users WHERE email = ?';
  db.execute(query, [email], callback);
};

// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';

export const register = (req, res) => {
  const { name, email, password, role } = req.body;
  
  createUser(name, email, password, role, (err, result) => {
    if (err) return res.status(500).send('Error creating user');
    res.redirect('/auth/login');
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  
  getUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid credentials');
    
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).send('Invalid credentials');
      
      // Generate a token (optional) and set session
      const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.SESSION_SECRET);
      req.session.token = token;
      req.session.user = user;
      
      // Redirect based on role
      if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
      } else if (user.role === 'organizer') {
        res.redirect('/events/manage');
      } else {
        res.redirect('/events');
      }
    });
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

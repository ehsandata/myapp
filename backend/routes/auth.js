import express from 'express';
import argon2 from 'argon2';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';
const JWT_EXPIRES_IN = '7d'; // 7 days


// Register
router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 32 }).withMessage('Username must be 3-32 chars.'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars.')
  ],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const hashedPassword = await argon2.hash(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
});

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars.')
  ],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    // Send JWT as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return res.status(200).json({ message: 'Login successful.', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
});

// Get current user info from JWT
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ user: { id: decoded.id, username: decoded.username, email: decoded.email } });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
});

// Logout: clear the cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ message: 'Logged out.' });
});

export default router;

import express from 'express';
import argon2 from 'argon2';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
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
router.post('/login', async (req, res) => {
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
    // For demo: return basic info (no JWT yet)
    return res.status(200).json({ message: 'Login successful.', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
});

export default router;

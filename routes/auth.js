const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Page (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Register Page (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle Registration (POST)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send('User already exists');
    }

    const user = await User.create({ username, email, password });
    req.session.user = user; // Store user in session
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Handle Login (POST)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).send('Invalid credentials');
    }

    req.session.user = user; // Store user in session
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Logout (GET)
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Profile Page (GET)
router.get('/profile', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const user = await User.findById(req.session.user._id);
  res.render('profile', { user });
});

// Save Quiz Score (POST)
router.post('/quiz/score', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { score } = req.body;
  const user = await User.findById(req.session.user._id);

  user.scores.push({ score });
  await user.save();

  res.redirect('/profile');
});

module.exports = router;

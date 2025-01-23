// routes/results.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * GET /results
 * Called after finishing the quiz:
 *   e.g. /results?score=NUMBER&total=NUMBER
 */
router.get('/', async (req, res) => {
  // Must be logged in to record the score
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    // Parse query parameters
    const score = parseInt(req.query.score) || 0;
    const totalQuestions = parseInt(req.query.total) || 10;

    // Update the logged-in user's record with the new quiz score
    const user = await User.findById(req.session.user._id);
    if (!user) {
      // In case user was somehow not found in DB
      return res.redirect('/login');
    }

    // Push this new score into the user's 'scores' array
    user.scores.push({
      score: score,
      date: new Date()
    });
    await user.save();

    // Build a global leaderboard for all users in DB
    const allUsers = await User.find({});

    // For each user, pick their best score from 'scores' array
    let scoreboard = allUsers.map(u => {
      if (!u.scores || u.scores.length === 0) {
        return { username: u.username, score: 0 };
      }
      // Get the highest score in that user's array
      const bestScore = Math.max(...u.scores.map(s => s.score));
      return { username: u.username, score: bestScore };
    });

    // Sort descending by best score
    scoreboard.sort((a, b) => b.score - a.score);

    // Optionally keep only the top 10
    scoreboard = scoreboard.slice(0, 10);

    // Finally, render the 'results.ejs' view
    res.render('results', {
      scoreboard,       // Global top scores
      score,            // The current user's new quiz score
      totalQuestions    // Number of questions in this quiz
    });
  } catch (err) {
    console.error('Error in /results route:', err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;

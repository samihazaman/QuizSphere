// routes/results.js
var express = require('express');
var router = express.Router();

// In-memory scoreboard
// Each entry will look like: { username: 'Player1', score: 5 }
let scoreboard = [];

/**
 * GET /results
 * Example usage:
 *   redirect to /results?score=NUMBER&total=NUMBER from quiz.ejs
 */
router.get('/', (req, res) => {
  // Parse query parameters
  const score = parseInt(req.query.score) || 0;
  const totalQuestions = parseInt(req.query.total) || 10;

  // For demonstration, we'll assign a placeholder username
  // In a real app, you might prompt the user for their name or generate a unique ID
  const newEntry = {
    username: 'Player' + (scoreboard.length + 1),
    score
  };

  // Add current player's score to the scoreboard
  scoreboard.push(newEntry);

  // Sort scoreboard descending by score
  scoreboard.sort((a, b) => b.score - a.score);

  // Keep only top 10 if you like
  if (scoreboard.length > 10) {
    scoreboard = scoreboard.slice(0, 10);
  }

  // Render the results page, passing scoreboard & user’s data
  res.render('results', {
    scoreboard,       // The in-memory leaderboard
    score,            // Current player's score
    totalQuestions    // Total question count
  });
});

module.exports = router;

// routes/results.js
var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');


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



// POST route to save the quiz result
router.post('/save-score', async (req, res) => {
  try {
    const { userId, score } = req.body; // `userId` and `score` sent from the frontend
    const usersCollection = getCollection('quiz-sphere');

    // Update the user's document with the new score
    const result = await usersCollection.updateOne(
      { _id: userId }, // Find the user by their unique ID
      {
        $push: { 
          quizResults: { 
            score: score, 
            date: new Date() 
          } 
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: 'Score saved successfully!' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


module.exports = router;

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files 
app.use(express.static(__dirname));

// routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'quiz.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'results.html'));
});

// Endpoint to get quiz questions
app.get('/api/questions', (req, res) => {
  fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading questions file');
    }
    const questions = JSON.parse(data);
    // Randomly select 10 questions
    const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    res.json(selectedQuestions);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

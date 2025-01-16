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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

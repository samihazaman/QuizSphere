var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('quiz'); 
  });
  

//route to fetch questions from json file
router.get('/questions', (req, res) => {
    const filePath = path.join(__dirname, '../data/questions.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading questions file:', err);
        return res.status(500).json({ error: 'Failed to load questions' });
      }
  
      const allQuestions = JSON.parse(data);
  
      // randomize and select 10 questions
      const selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
      res.json(selectedQuestions);
    });
  });
  
module.exports = router;

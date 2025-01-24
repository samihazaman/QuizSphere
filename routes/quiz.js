var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function (req, res, next) {
    res.render('quiz'); 
});

// Route to fetch questions from Trivia API
router.get('/questions', async (req, res) => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=50'); // Fetch more questions to have a good pool
        const fetchedQuestions = response.data.results;

        // Initialize usedQuestions in the session if not already initialized
        if (!req.session.usedQuestions) {
            req.session.usedQuestions = [];
        }

        // Filter out questions that have already been used
        const newQuestions = fetchedQuestions.filter(q => 
            !req.session.usedQuestions.includes(q.question));

        // Shuffle and select 10 questions
        const selectedQuestions = newQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

        // Update session with the used questions
        req.session.usedQuestions.push(...selectedQuestions.map(q => q.question));

        const questions = selectedQuestions.map((q, index) => {
            const options = [...q.incorrect_answers, q.correct_answer];
            // Shuffle options
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            const correctIndex = options.indexOf(q.correct_answer);
            const optionLabels = ['A', 'B', 'C', 'D'];

            return {
                question: q.question,
                A: options[0],
                B: options[1],
                C: options[2],
                D: options[3],
                answer: optionLabels[correctIndex]
            };
        });

        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

module.exports = router;

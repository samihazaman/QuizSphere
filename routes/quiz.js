var express = require('express');
var router = express.Router();

//Get quiz page
router.get('/', function(req, res, next) {
  res.render('quiz');
});

module.exports = router;

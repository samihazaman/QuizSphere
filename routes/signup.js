var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const { getCollection } = require('../models/db'); // Import the DB helper

router.get('/', function(req, res, next) {
  res.render('signup');
});

function hashpw(password){
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return {salt, hash};
}

// Post signup form submission
router.post('/', async (req, res) => {
  const {username, email, password, enteredpassword} = req.body;
  try{

    if(password.length < 6 || username.length < 6){
      return res.render('signup', {error: "Username or password must be more than 6 characters"});
    }

    if(password !== enteredpassword){
      return res.render('signup', {error: "Passwords do not match!"});
    }

    const{salt,hash} = hashpw(password);

    let conn = getCollection("users");
    await conn.insertOne({
      username,
      email,
      password: hash,
      salt: salt
    });

    return res.redirect('/login');
    
  } catch(e) {
    console.error('Signup error',e);
    return res.render('signup',{error: "A signup error occured, please try again"})
  }
});

module.exports = router;

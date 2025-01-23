var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const { getCollection } = require('../models/db'); 

router.get('/', function(req, res) {
  res.render('login');
});

function verify(loginsalt, loginhash, loginpassword){
  const loginhashpassword = crypto.pbkdf2Sync(loginpassword, loginsalt, 100000, 64, 'sha512').toString('hex');
  return loginhashpassword === loginhash;
}

router.post('/', async (req,res) => {
  const {username, password} = req.body;

  try{
    let conn = getCollection("users");

    const user = await conn.findOne({username});

    if(!user || !verify(user.salt, user.password, password)){
      console.log("Username or password is incorrect");
      return res.render('login',{error: "Username or password is incorrect"})
    }

    req.session.useremail = user.email;

    return res.redirect('/index');
    
  } catch(e) {
    console.error("Login error", e);
    return res.render('login',{error: "A login error occured, please try again"})
  }
})

module.exports = router;

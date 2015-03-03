var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/login');
});

router.get('/login', function(req, res) {
  if(req.user) {
    return res.redirect('/app');
  }

  res.render('login', { title: 'Login – DeveldoGTG'});
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;

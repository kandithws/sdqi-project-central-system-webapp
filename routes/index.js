var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController.js');

/* GET home page. */
router.get('/',  function(req, res, next){
    req.flash("info", "Hello World!");
    res.render('index.ejs', { title: 'Express' }); 
});

router.get('/dashboard', authController.isLoggedIn, function(req, res, next){
    req.flash("info", "Welcome " + req.user.firstname + " !");
    res.render('dashboard.ejs'); 
});


// Navigation bars routing


module.exports = router;


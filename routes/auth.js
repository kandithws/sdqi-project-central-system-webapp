var authController = require('../controllers/AuthController.js');


module.exports = function(app,passport){

    app.get('/signup', authController.signup);
    
    
    app.get('/signin', authController.signin);
    
    
    app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
                                                        successFlash: 'Sign up Sucessfully!',
                                                        failureRedirect: '/signup',
                                                        failureFlash : true}
                                                        ));
    
    
    app.get('/logout',authController.logout);
    
    
    app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                        successFlash: 'Sign in Succesfully',
                                                        failureRedirect: '/signin',
                                                        failureFlash : true}
                                                        ));

    
    
}
    
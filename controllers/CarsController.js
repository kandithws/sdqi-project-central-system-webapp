var Car = require('../models/index').Car;
var User = require('../models/index').User;
var ac = require('./AccessController');
var SequelizeValidationError = require('sequelize').ValidationError;
var exports = module.exports = {}

function setCarResource(req){
    return Car.findById(req.params.car_id)
}

function getValidationErrorMsgs(err){
    err_items = err.errors;
    var msg = err.message + '\n';
    for (var i = 0; i < err_items.length; i++){
        msg = msg + err_items[i].message + '\n'; 
    }
    return msg;
}


// Render a form to create
exports.new = function(req,res){
    if(ac.isAuthorizedOwn(req, 'create', 'Car')){
        var car = Car.build()
        res.render('cars/new', {car: car});
    }
    else{
        req.flash("error", "Unauthorized !").then(res.redirect('/dashboard'))
        
    }
}

// Create Resource
exports.create = function(req,res){
    if(ac.isAuthorizedOwn(req, 'create', 'Car')){        
        Car.create({
            license_plate_number: req.body.license_plate_number,
            brand: req.body.brand,
            model_name: req.body.model_name,
            model_year: req.body.model_year,
            color: req.body.color
        }).then( (car) => {
            // This will auto persisted to DB
            // if not want to persisted car.setUser(user, {save: false}) 
            User.findById(req.user.id).then( (user) => {
                car.setUser(user);
                req.flash('success', 'Succesfully create a new car'); 
                res.redirect('/dashboard');
            }).catch( (err) => {req.flash('error', 'Sorry, System Error!').then(res.redirect('/cars/new'))});
        }
        ).catch( SequelizeValidationError, (err) => {
            req.flash('error', err.message).then(res.redirect('/cars/new'))
        }).catch((err) => {
            req.flash('error', 'Sorry, System Error!').then(res.redirect('/cars/new'))
        })
    }
    else {
        console.log('Error 3')
        req.flash("error", "Unauthorized !").then(res.redirect('/dashboard'))
    }
}


// Render a page to show information o
exports.show = function(req,res){

}

// Render a form to edit
exports.edit = function(req,res){
    
}

// Update Action
exports.update = function(req,res){
    
}

// Delte Action
exports.delete = function(req,res){
    
}
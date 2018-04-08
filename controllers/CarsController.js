var Car = require('../models/index').Car;
var ac = require('./AccessController');

var exports = module.exports = {}

function setCarResource(req){
    return Car.findById(req.params.car_id)
}


// Render a form to create
exports.new = function(req,res){
    var car = Car.build()
    if(ac.isAuthorizedOwn(req, 'create', 'Car')){
        res.render('cars/new', {car: car});
    }
    else{
        req.flash("error", "Unauthorized !");
        res.redirect('/dashboard');
    }
}

// Create Resource
exports.create = function(req,res){
 /*
    var current_user = req.user
    if(ac.isAuthorizedOwn(req, 'create', 'Car')){
        
        res.render('cars/new', {car: car});
    }
    else{
        req.flash("error", "Unauthorized !");
        res.redirect('/dashboard');
    }
 */   
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
var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');
var carsController = require('../controllers/CarsController');

// read
// router.get('/:car_id', carsController.show)

router.get('/new', authController.isLoggedIn, carsController.new)

router.post('/cars', authController.isLoggedIn, carsController.create)
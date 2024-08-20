const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.getHome);
router.get('/home', viewController.getHome);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignup);
router.get('/rooms', viewController.getRooms);
router.get('/rooms/:roomname', viewController.getChat);
router.get('/profile', viewController.getProfile);

module.exports = router;

const express = require('express');

const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.filterBody, roomController.createRoom);
router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(authController.restrictTo('admin'), roomController.updateRoom)
  .delete(authController.restrictTo('admin'), roomController.deleteRoom);

module.exports = router;

const express = require('express');

const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(messageController.getAllMessages)
  .post(messageController.filterBody, messageController.createMessage);
router
  .route('/:id')
  .get(messageController.getMessage)
  .patch(authController.restrictTo('admin'), messageController.updateMessage)
  .delete(authController.restrictTo('admin'), messageController.deleteMessage);

module.exports = router;

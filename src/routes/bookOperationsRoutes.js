const express = require('express');
const router = express.Router();
const bookOperationsController = require('../controllers/bookOperationsController');

// issue a book
router.post('/issue', bookOperationsController.bookIssue);
router.post('/return', bookOperationsController.bookReturn);
router.post('/renew', bookOperationsController.bookRenew);
router.post('/reserve', bookOperationsController.bookReserve);

module.exports = router;
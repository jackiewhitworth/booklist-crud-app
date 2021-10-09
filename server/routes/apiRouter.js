const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');

router.post('/addBook', apiController.addBook, (req, res) => {
  res.status(200).json(res.locals.addBookRes);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');


router.get('/getBooks', apiController.getBooks, (req, res) => {
  res.status(200).json(res.locals.getBookRes);
})


router.post('/addBook', apiController.addBook, (req, res) => {
  res.status(200).json(res.locals.addBookRes);
});


router.delete('/deleteBook', apiController.deleteBook, (req, res) => {
  res.status(200).json(res.locals.deleteBookRes);
})

module.exports = router;
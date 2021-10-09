const Book = require('../models/book.js');

const apiController = {

  async addBook (req, res, next) {
    const { title, author, isbn } = req.body;
    const book = await Book.create({
      title: title,
      author: author,
      isbn: isbn
      // user_id: user_id
    })

    console.log(book);
    res.locals.addBookRes = book;
    return next();
  }
}


module.exports = apiController;
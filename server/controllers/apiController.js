const Book = require('../models/book.js');

const apiController = {

  async getBooks(req, res, next) {
    try {
      const books = await Book.find();
      console.log(books);
      res.locals.getBookRes = [books];
      return next();
    } catch {
      return next(err);
    }
  },

  async addBook(req, res, next) {
    const { title, author, isbn } = req.body;
    const book = await Book.create({
      title: title,
      author: author,
      isbn: isbn,
      // user_id: user_id
    });

    res.locals.addBookRes = book
    return next();
  },


  async deleteBook(req, res, next) {
    const { isbn } = req.body;
    const book = await Book.findOneAndDelete({
      isbn: isbn
    });

    res.locals.deleteBookRes = book;
    return next();
  }
}


module.exports = apiController;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true
  },
  // user_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
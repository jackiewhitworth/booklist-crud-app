const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  firstname: {
    type: String,
    required: [true, 'Please enter your first name']
  },
  lastname: {
    type: String,
    required: [true, 'Please enter your last name']
  },
  username: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  }
})

const User = mongoose.model('user', userSchema);

module.exports = User;
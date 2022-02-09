const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide email"],
    minLength: 6,
  },
  lastname: {
    type: String,
    maxLength: 20,
    trim: true,
    default: 'lastname'
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: 'my city'
  },
}, {
  timestamps: true;
});


const User = mongoose.model('User', userSchema);

module.exports = User;


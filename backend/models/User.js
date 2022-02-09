const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      validator: validator.isEmail,
      msg: 'Please provide a valid email'
    },
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
  timestamps: true
});

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  console.log(this.password)
})

const User = mongoose.model('User', userSchema);

module.exports = User;


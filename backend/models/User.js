import  mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
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

// Password gets hashed before saved to db
userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  console.log(this.password)
})
// JWT `
userSchema.methods.createJWT = function() {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME} )
}
// Password comparison method
userSchema.methods.comparePassword = async function(canidatePassword) {
  const isMatch = await bcrypt.compare(canidatePassword, this.password)
  return isMatch
}

const User = mongoose.model('User', userSchema);

export default User


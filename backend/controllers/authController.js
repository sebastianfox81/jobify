const User = require('../models/User')
const statusCodes = require('http-status-codes')

const authCtrl = {};

authCtrl.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(statusCodes.CREATED).json({ user : {
      name: user.name,
      email: user.email,
      location: user.location,
      lastname: user.lastname
    }, token })
  } catch (error) {
    next(error)
  }
}

authCtrl.login = async (req, res) => {

  const { email, password} = req.body;
  const user = await User.findOne({ email }).select('+password')
  const isPasswordCorrect = user.comparePassword(password)
  try {
    res.status(200).json({ msg: 'Login successful'})
  } catch (err) {
    res.status(500).json({ msg: err.message})
  }


}

authCtrl.updateUser = async (req, res) => {
  res.send('update user')
}

authCtrl.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User deleted')
  } catch (err) {
    res.status(400).json(err)
  }
}

authCtrl.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

module.exports = authCtrl
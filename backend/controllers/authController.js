const User = require('../models/User')

const authCtrl = {};

authCtrl.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await new User({ name, email, password });
    await newUser.save()
    res.status(200).json('New User Registered')
  } catch (err) {
    res.status(400).json(err)
  }
}
authCtrl.login = async (req, res) => {
  res.send('login user')
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

module.exports = authCtrl
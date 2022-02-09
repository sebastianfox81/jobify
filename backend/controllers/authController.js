const User = require('../models/User')

const authCtrl = {};

authCtrl.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await new User({ name, email, password });
    await newUser.save()
    const token = newUser.createJWT()
    res.status(200).json({ newUser :{
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
      lastname: newUser.lastname
    }, token })
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

authCtrl.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

module.exports = authCtrl
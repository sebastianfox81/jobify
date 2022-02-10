const User = require('../models/User')

const authCtrl = {};

authCtrl.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User({ name, email, password });
    await user.save()
    const token = user.createJWT()
    res.status(200).json({ user : {
      name: user.name,
      email: user.email,
      location: user.location,
      lastname: user.lastname
    }, token })
  } catch (err) {
    next(err)
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
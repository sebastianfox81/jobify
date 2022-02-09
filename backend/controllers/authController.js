const authCtrl = {};

authCtrl.register = (req, res) => {
  res.send('register user')
}
authCtrl.login = (req, res) => {
  res.send('login user')
}
authCtrl.updateUser = (req, res) => {
  res.send('update user')
}

module.exports = authCtrl
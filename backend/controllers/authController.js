const authCtrl = {};

authCtrl.register = async (req, res) => {
  res.send('register user')
}
authCtrl.login = async (req, res) => {
  res.send('login user')
}
authCtrl.updateUser = async (req, res) => {
  res.send('update user')
}

module.exports = authCtrl
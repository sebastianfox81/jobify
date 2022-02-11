import User from '../models/User.js'
import  statusCodes from 'http-status-codes'
import { BadRequest } from '../errors/index.js'
import { NotFound } from '../errors/index.js'

const register = async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequest('please provide all values')
    }
    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
      throw new BadRequest('Email already exists')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(statusCodes.default.CREATED).json({ user : {
      name: user.name,
      email: user.email,
      location: user.location,
      lastname: user.lastname
    }, token })

}

const login = async (req, res, err) => {

  try {
    const { email, password} = req.body;
    const user = await User.findOne({ email }).select('+password')
    console.log(user)
    const isPasswordCorrect = user.comparePassword(password)

    if (!isPasswordCorrect) {
      res.status(400).json({ msg: 'Password Incorrect'})
    }
    res.status(200).json({ msg: 'Login successful'})
  } catch (err) {
    next(err)
  }


}

const updateUser = async (req, res) => {
  res.send('update user')
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User deleted')
  } catch (err) {
    res.status(400).json(err)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

export { register, login, updateUser, deleteUser, getAllUsers}
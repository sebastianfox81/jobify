import User from '../models/User.js'
import  statusCodes from 'http-status-codes'
import { BadRequest, UnAuthenticatedError, NotFound } from '../errors/index.js'

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
    },
    token,
    location: user.location
  })

}

const login = async (req, res) => {

    const { email, password} = req.body;
    if (!email || !password) {
      throw new BadRequest('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Password')
    }
    const token = user.createJWT()
    user.password = undefined;
  res.status(statusCodes.default.CREATED).json({ user, token, location: user.location})
}

const updateUser = async (req, res) => {
  const { email, name, lastname, location } = req.body;
  if (!email || !name || !lastname || !location) {
    throw new BadRequest('Please Provide All Vaules')
  }
  const user = await User.findOne({ _id: req.user.userId});

  user.email = email
  user.name = name
  user.lastname = lastname
  user.location = location

  await user.save();
  // New Token is optional
  const token = user.createJWT()

  res.status(statusCodes.default.CREATED).json({ user, token, location: user.location})

  console.log(req.user)
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
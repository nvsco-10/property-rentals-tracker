import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

// async errors package handles try catch
const register = async (req, res) => {
  const { username, email, password } = req.body

  if ( !username || !email || !password){
    throw new BadRequestError('Please provide all values')
  }

  const emailExists = await User.findOne({email})
  if (emailExists) {
    throw new BadRequestError('Email already in use')
  }
  const usernameExists = await User.findOne({username})
  if (usernameExists) {
    throw new BadRequestError('Username already in use')
  }

  const user = await User.create(req.body)
  res.status(StatusCodes.OK).json(user)

}

const login = async (req,res) => {
  res.send('login')
}

const updateUser = async (req,res) => {
  res.send('updateUser')
}

export { register, login, updateUser }



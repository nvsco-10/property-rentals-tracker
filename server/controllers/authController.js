import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

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
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ 
    user: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      // assignedRentals: user.assignedRentals
    }, 
    token 
  })

}

const login = async (req,res) => {
  const { username, password } = req.body

  if( !username || !password ) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ username }).select('+password')
  if(!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPassword = await user.comparePassword(password)
  if(!isPassword) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()

  // set pw to undefined so it's not included in response
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req,res) => {
  // add assignedRentals
 const { username, email, firstName, lastName, phoneNumber, isAdmin } = req.body

 if ( !username || !email ) {
   throw new BadRequestError('Please provide all values')
 }

 const user = await User.findOne({ _id: req.user.userId })

 user.username = username
 user.email = email
 user.firstName = firstName
 user.lastName = lastName
 user.phoneNumber = phoneNumber
 user.isAdmin = isAdmin

 await user.save()

 // optional: create new token for updated user
 const token = user.createJWT()

 res.status(StatusCodes.OK).json({ user, token })

}

export { register, login, updateUser }



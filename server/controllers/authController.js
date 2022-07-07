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
      isAdmin: user.isAdmin,
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

const updateUser = async ({ body, params },res) => {
 const { username, email, firstName, lastName, isAdmin } = body

 if ( !username || !email || !firstName || !lastName ) {
   throw new BadRequestError('Please provide all values')
 }

 const user = await User.findOne({ _id: params.id })

 user.username = username
 user.email = email
 user.firstName = firstName
 user.lastName = lastName
 user.isAdmin = isAdmin

 await user.save()


 res.status(StatusCodes.OK).json({ user })

}

const getAllUsers = async (req,res) => {
  const users = await User.find()
  
  res.status(StatusCodes.OK).json({ users })
}

const createUser = async (req,res) => {
  const { username, email, password, firstName, lastName } = req.body

  if ( !username || !email || !password || !firstName || !lastName ){
    throw new BadRequestError('Please provide all values')
  }

  if(password.length < 6) {
    throw new BadRequestError('Password must be a minimum of 6 characters')
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

  res.status(StatusCodes.CREATED).json({ 
    user: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    }
  })

}

const deleteUser = async ({ params },res) => {
  const deletedUser = await User.findOneAndDelete({ _id: params.id })

  if (!deletedUser) {
    throw new NotFoundError(`No user with id: ${params.id}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! User removed' })
}

export { register, login, updateUser, getAllUsers, createUser, deleteUser }



import User from '../models/User.js'

const register = async ({ body },res) => {

  try {
    const user = await User.create(body)
    res.status(201).json(user)

  } catch (error) {
    res.status(500).json({ msg: 'there was an error'})
  }

}

const login = async (req,res) => {
  res.send('login')
}

const updateUser = async (req,res) => {
  res.send('updateUser')
}

export { register, login, updateUser }



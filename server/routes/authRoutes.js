import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'
import { register, login, updateUser, getAllUsers, createUser, deleteUser } from '../controllers/authController.js'

// router.route('/register').post(register)
router.route('/login').post(login)

router.route('/createUser').post(createUser)

router.route('/users').get(authenticateUser, getAllUsers)

router.route('/users/:id')
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser)

export default router
import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'
import { 
  register, 
  login, 
  updateUser, 
  getAllUsers, 
  createUser, 
  deleteUser 
} from '../controllers/authController.js'

// only if register functionality will be implemented
// router.route('/register').post(register)

router.route('/login').post(login)

// only admin can create user through dashboard
router.route('/createUser').post(createUser)

router.route('/users').get(authenticateUser, getAllUsers)

router.route('/users/:id')
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser)

export default router
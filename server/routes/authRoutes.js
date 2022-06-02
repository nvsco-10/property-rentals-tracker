import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'
import { register, login, updateUser, getAllUsers } from '../controllers/authController.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)

router.route('/users').get(authenticateUser, getAllUsers)

export default router
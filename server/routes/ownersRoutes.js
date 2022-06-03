import express from 'express'
const router = express.Router()

import { createOwner } from '../controllers/ownersController.js'

router.route('/')
  .post(createOwner)

export default router
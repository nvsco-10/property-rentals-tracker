import express from 'express'
const router = express.Router()

import { createOwner, getOwners } from '../controllers/ownersController.js'

router.route('/')
  .get(getOwners)
  .post(createOwner)

export default router
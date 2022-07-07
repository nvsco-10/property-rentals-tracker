import express from 'express'
const router = express.Router()

import { 
  createOwner, 
  updateOwner, 
  deleteOwner, 
  getOwners 
} from '../controllers/ownersController.js'

router.route('/')
  .get(getOwners)
  .post(createOwner)

router.route('/:id')
  .patch(updateOwner)
  .delete(deleteOwner)

export default router
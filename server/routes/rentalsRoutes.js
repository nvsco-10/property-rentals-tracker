import express from 'express'
const router = express.Router()

import { createRental, getAllRentals, getAssignedRentals, getRentalById, updateRental, deleteRental, showStats, createAction, createNote  } from '../controllers/rentalsController.js'

router.route('/')
  .get(getAllRentals)
  .post(createRental)

router.route('/assignedRentals')
  .get(getAssignedRentals)

router.route('/actions/:actionId')
  .post(createNote)

router.route('/:id')
  .get(getRentalById)
  .post(createAction)



export default router
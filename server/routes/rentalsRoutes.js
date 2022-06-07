import express from 'express'
const router = express.Router()

import { createRental, getAllRentals, getAssignedRentals, getRentalById, updateRental, deleteRental, showStats, createAction, updateAction, deleteAction, createNote, updateNote, deleteNote  } from '../controllers/rentalsController.js'

router.route('/')
  .get(getAllRentals)
  .post(createRental)
  

router.route('/assignedRentals')
  .get(getAssignedRentals)

router.route('/actions/:actionId')
  .post(createNote)
  .patch(updateAction)
  .delete(deleteAction)

router.route('/actions/:actionId/:noteId')
  .patch(updateNote)
  .delete(deleteNote)

router.route('/:id')
  .get(getRentalById)
  .post(createAction)
  .patch(updateRental)
  .delete(deleteRental)



export default router
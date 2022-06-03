import Rental from '../models/Rental.js'
import Action from '../models/Action.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createRental = async (req,res) => {
  const { streetAddress, city, zipCode, assigned } = req.body

  if( !streetAddress || !city || !zipCode ) {
    throw new BadRequestError('Please provide all values')
  }

  // 629657dff0dd6759ce1fec52
  if ( !assigned ) req.body.assigned = '629657dff0dd6759ce1fec52'

  req.body.createdBy = '629657dff0dd6759ce1fec52'

  const rental = await Rental.create(req.body) 
  
  res.status(StatusCodes.CREATED).json({ rental })
  
}

const getAllRentals = async (req,res) => {
  const rentals = await Rental.find()
    .populate('owner')
    .populate('assigned')
    .populate('actions')

  res.status(StatusCodes.OK).json({ rentals, totalRentals: rentals.length })
}

const getAssignedRentals = async (req,res) => {
  const rentals = await Rental.find({ assigned: '629657dff0dd6759ce1fec52'})

  res.status(StatusCodes.OK).json({ rentals, totalRentals: rentals.length })
}

const getRentalById = async ({ params },res) => {
  const rental = await Rental.find({ _id: params.id })
    .populate('owner')
    .populate('assigned')
    .populate('createdBy')

  if( !rental ) {
    throw new BadRequestError('Can\'t find rental with that ID! ')
  }

  res.status(StatusCodes.OK).json({ rental })
}

const updateRental = async (req,res) => {
  res.send('updateRental')
}

const deleteRental = async (req,res) => {
  res.send('deleteRental')
}

const showStats = async (req,res) => {
  res.send('showStats')
}

const createAction = async ({ body, params, user },res) => {
  const { actionItem } = body

  if( !actionItem ) {
    throw new BadRequestError('Please provide all values')
  }

  // user.userId '629657dff0dd6759ce1fec52'
  body.createdBy = '629657dff0dd6759ce1fec52'

  const action = await Action.create(body) 

  const updatedRental = await Rental.findOneAndUpdate(
    { _id: params.id },
    { $addToSet: { actions: action } },
    { runValidators: true, new: true }
  )

  if( !updatedRental ) {
    throw new BadRequestError('Can\'t find rental with that ID! ')
  }
  
  res.status(StatusCodes.CREATED).json({ updatedRental })
}

export { createRental, getAllRentals, getAssignedRentals, getRentalById, updateRental, deleteRental, showStats, createAction }
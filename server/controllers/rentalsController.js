import Rental from '../models/Rental.js'
import Action from '../models/Action.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import mongoose from 'mongoose'

// import checkPermissions from '../utils/checkPermissions.js'

const createRental = async ({ user, body },res) => {
  const { streetAddress, city, zipCode, assigned, owner } = body
  let { createdBy } = body

  if( !streetAddress || !city || !zipCode || !assigned || !owner ) {
    throw new BadRequestError('Please provide all values')
  }

  createdBy = user.userId

  const rental = await Rental.create(body) 

  res.status(StatusCodes.CREATED).json({ rental })
  
}

const getAllRentals = async (req,res) => {
  const { status, search } = req.query 

  const queryObject = {
    status: ['open', 'pending-lease', 'maintenance']
  }
  // add stuff based on condition

  if (status === 'all') {
    queryObject.status = ['open', 'pending-lease', 'maintenance', 'closed']
  }

  if (status === 'inactive') {
    queryObject.status = ['closed']
  }

  if(search) {
    queryObject.streetAddress = { $regex: search, $options: 'i'}
  }
  
  // no await
  let result = Rental.find(queryObject)
    .populate('owner')
    .populate('assigned')
    .populate('actions')

  const rentals = await result

  res.status(StatusCodes.OK).json({ rentals, totalRentals: rentals.length })
}

const getAssignedRentals = async ({ user },res) => {
  const queryObject = {
    assigned: { 
      _id: user.userId 
    },
    status: ['open', 'pending-lease', 'maintenance']
  }

  const rentals = await Rental.find(queryObject)
    .populate('actions')
    .populate('owner')

  if (!rentals) {
    throw new NotFoundError(`No rentals with user id: ${user.userId}`)
  }

  res.status(StatusCodes.OK).json({ rentals, totalRentals: rentals.length })
}

const getRentalById = async ({ params },res) => {
  const rental = await Rental.find({ _id: params.id })
    .populate('owner')
    .populate('assigned')
    .populate('createdBy')
    .populate({
      path:     'actions',			
      populate: [
        { 
            path:  'createdBy',
            model: 'User', 
        },
        { 
          path:  'notes',
          populate: [
            {
              path: 'createdBy',
              model: 'User', 
            }
          ]
        },
      ]
      })

  if( !rental ) {
    throw new BadRequestError('Can\'t find rental with that ID! ')
  }

  res.status(StatusCodes.OK).json({ rental })
}

const showStats = async ({ user },res) => {
  let stats = await Rental.aggregate([
    { 
      $group: { 
      _id: '$status', 
      count: { '$sum': 1 } 
      }
    }
  ])

  stats = stats.reduce((acc,curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  res.status(StatusCodes.OK).json({ stats })
}

const getRentalsByOwner = async ({ params },res) => {
  const rentals = await Rental.find({ owner: { _id: params.ownerId }})

  if (!rentals) {
    throw new NotFoundError(`No rentals with owner id: ${params.ownerId}`)
  }

  res.status(StatusCodes.OK).json({ rentals, totalRentals: rentals.length })
}

const updateRental = async ({ body, params },res) => {
  const { streetAddress, city, zipCode } = body

  if( !streetAddress || !city || !zipCode ) {
    throw new BadRequestError('Please provide all values')
  }

  const rental = await Rental.findOne({ _id: params.id })

  if (!rental) {
    throw new NotFoundError(`No rental with id: ${params.id}`)
  }

  const updatedRental = await Rental.findOneAndUpdate({ _id: params.id }, body,
    { runValidators: true, new: true }
  )
  
  res.status(StatusCodes.OK).json({  updatedRental })
}

const deleteRental = async ({ params },res) => {
  const deletedRental = await Rental.findOneAndDelete({ _id: params.id })

  if (!deletedRental) {
    throw new NotFoundError(`No rental with id: ${params.id}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Rental removed' })
}

const createAction = async ({ body, params, user },res) => {
  const { actionItem } = body

  if( !actionItem ) {
    throw new BadRequestError('Please provide an action item')
  }

  // user.userId '629657dff0dd6759ce1fec52'
  body.createdBy = user.userId

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

const updateAction = async ({ body, params }, res) => {
  const { actionItem } = body

  if( !actionItem ) {
    throw new BadRequestError('Please provide an action item')
  }

  const action = await Action.findOne({ _id: params.actionId })

  if (!action) {
    throw new NotFoundError(`No action with id: ${params.actionId}`)
  }

  const updatedAction = await Action.findOneAndUpdate({ _id: params.actionId }, body,
    { runValidators: true, new: true }
  )
  
  res.status(StatusCodes.OK).json({ updatedAction })
}

const deleteAction = async ({ params }, res) => {
  const deletedAction = await Action.findOneAndDelete({ _id: params.actionId })

  if (!deletedAction) {
    throw new NotFoundError(`No action with id: ${params.actionId}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Action removed' })
}

const createNote = async ({ body, params, user },res) => {
  const { note } = body

  if( !note ) {
    throw new BadRequestError('Please provide a note')
  }

  if( note.length > 400 ) {
    throw new BadRequestError('Note character length has been exceeded. Only 400 characters allowed ')
  }

  body.createdBy = user.userId

  const updatedAction = await Action.findOneAndUpdate(
    { _id: params.actionId },
    { $addToSet: { notes: body } },
    { runValidators: true, new: true }
  )

  if( !updatedAction ) {
    throw new NotFoundError(`No action with id: ${params.actionId}`)
  }
  
  res.status(StatusCodes.CREATED).json({ updatedAction })
}

const updateNote = async ({ body, params },res) => {
  const { note } = body

  if( !note ) {
    throw new BadRequestError('Please provide a note')
  }

  const updatedAction = await Action.findOneAndUpdate(
    // https://www.mongodb.com/docs/manual/reference/operator/update/positional/
    
    // update conflict with timestamps:
    // https://stackoverflow.com/questions/63994447/mongodb-update-in-array-fails-updating-the-path-companies-updatedat-would-c
    { _id: params.actionId, "notes._id": params.noteId  },
    { $set: { "notes.$.note": note  } },
    { new: true }
  )

  if( !updatedAction ) {
    throw new NotFoundError(`No action with id: ${params.actionId}`)
  }
  
  res.status(StatusCodes.OK).json({ updatedAction })
}

const deleteNote = async ({ params }, res) => {
  const updatedAction = await Action.findOneAndUpdate(
    { _id: params.actionId },
    { $pull: { notes: { _id: params.noteId } } },
    { new: true }
  )

  if (!updateAction) {
    throw new NotFoundError(`No action with id: ${params.actionId}`)
  }

  res.status(StatusCodes.OK).json({ updatedAction })
}

export { createRental, getAllRentals, getAssignedRentals, getRentalById, getRentalsByOwner, updateRental, deleteRental, showStats, createAction, updateAction, deleteAction, createNote, updateNote,deleteNote }
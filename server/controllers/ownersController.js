import Owner from '../models/Owner.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createOwner = async (req,res) => {
  const { name } = req.body

  if( !name ) {
    throw new BadRequestError('Please provide a name')
  }

  const owner = await Owner.create(req.body) 
  
  res.status(StatusCodes.CREATED).json({ owner })

}

const updateOwner = async ({ body, params },res) => {
  const { name } = body

  if( !name ) {
    throw new BadRequestError('Please provide a name')
  }

  const owner = await Owner.findOne({ _id: params.id })

  if (!owner) {
    throw new NotFoundError(`No owner with id: ${params.id}`)
  }

  const updatedOwner = await Owner.findOneAndUpdate({ _id: params.id }, body,
    { runValidators: true, new: true }
  )
  
  res.status(StatusCodes.OK).json({ updatedOwner })
}

const deleteOwner = async ({ params },res) => {
  const deletedOwner = await Owner.findOneAndDelete({ _id: params.id })

  if (!deletedOwner) {
    throw new NotFoundError(`No owner with id: ${params.id}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Owner removed' })
}

const getOwners = async (req,res) => {
  const owners = await Owner.find()

  res.status(StatusCodes.OK).json({ owners })
}

export { createOwner, updateOwner, deleteOwner, getOwners }
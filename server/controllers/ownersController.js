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

const getOwners = async (req,res) => {
  const owners = await Owner.find()
    .populate('rentals')

  res.status(StatusCodes.OK).json({ owners })
}

export { createOwner, getOwners }
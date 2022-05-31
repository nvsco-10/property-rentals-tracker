import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  
  const defaultError = {
    // if bad request status code is provided, use it, otherwise use 500
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later'
  }

  // if error is related to validation
  if(err.name === 'ValidationError'){
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
  }

  // if error is related to unique
  if(err.code && err.code === 11000){
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }

  // res.status(defaultError.statusCode).json({ msg: err })
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
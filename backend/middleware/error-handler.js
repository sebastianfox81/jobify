import statusCodes from 'http-status-codes'


const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message)

  const defaultError = {
    code: err.code || statusCodes.default.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }
  if (err.name === 'ValidationError') {
    defaultError.code = statusCodes.default.BAD_REQUEST
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
  }
  if (err.code && err.code === 11000) {
    defaultError.code = statusCodes.default.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }
  // res.status(defaultError.code).json({msg: err})
  // res.status(defaultError.code).json(err)
  res.status(defaultError.code).json({ msg: defaultError.msg})
}

export default errorHandlerMiddleware;
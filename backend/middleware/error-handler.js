const statusCodes = require('http-status-codes')
const Errors = {};

Errors.errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  const defaultError = {
    code: statusCodes.default.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong try again later'
  }
  if (err.name === 'ValidationError') {
    defaultError.code = statusCodes.default.BAD_REQUEST
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
  }
  // res.status(defaultError.code).json({msg: err})
  // res.status(defaultError.code).json(err)
  res.status(defaultError.code).json({ msg: defaultError.msg})
}

module.exports = Errors
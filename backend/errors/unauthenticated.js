import statusCodes from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.code = statusCodes.default.UNAUTHORIZED
  }
}

export default UnAuthenticatedError
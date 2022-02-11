import statusCodes from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message)
    this.code = statusCodes.default.BAD_REQUEST
  }
}

export default BadRequest

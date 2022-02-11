import statusCodes from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message)
    this.code = statusCodes.default.NOT_FOUND
  }
}

export default NotFound
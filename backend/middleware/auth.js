import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  if (!authHeader) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  next()
}

export default auth
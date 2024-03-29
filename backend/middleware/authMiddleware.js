import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import user from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await user.findById(decoded.id).select('-password')
      // console.log(req.user)
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('not authorized, failed access')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized , no token')
    //return next(new ErrorResponse('Not Authorize to access this route', 401))
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(404)
    throw new Error('not authorized as an admin')
  }
}

export { protect, admin }

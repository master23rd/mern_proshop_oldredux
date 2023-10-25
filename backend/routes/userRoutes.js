import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.get('/:id', protect, getUserById)
router.route('/:id').delete(protect, admin, deleteUser)
router.put('/:id', protect, admin, updateUser)

export default router

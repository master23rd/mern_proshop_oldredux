import express from 'express'
const router = express.Router()

import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts)

//direct route
//router.get('/', getProducts)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

//direct route
//router.get('/:id', getProductById)

export default router

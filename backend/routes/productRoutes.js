import express from 'express'
const router = express.Router()

import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts).post(protect, admin, createProduct)

//direct route
//router.get('/', getProducts)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)

//direct route
//router.get('/:id', getProductById)

export default router

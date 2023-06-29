import express from 'express'
const router = express.Router()

import { getProductById, getProducts } from '../controller/productController.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts)

//direct route
//router.get('/', getProducts)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public

router.route('/:id').get(getProductById)

//direct route
//router.get('/:id', getProductById)

export default router

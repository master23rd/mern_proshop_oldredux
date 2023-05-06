import express from 'express'
const router = express.Router()

import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    //convert array object to json
    res.status(200).json(products)
  })
)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      throw new Error('Product Not found')
      //   res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router

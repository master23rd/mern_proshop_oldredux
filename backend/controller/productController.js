import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch detail product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    throw new Error('Product Not found')
    //   res.status(404).json({ message: 'Product not found' })
  }
})

// @desc    Delete products
// @route   DELETE /api/products
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne() //remove deprecated
    res.json({ message: 'product removed' })
  } else {
    throw new Error('Product Not found')
    //   res.status(404).json({ message: 'Product not found' })
  }
})

export { getProductById, getProducts, deleteProduct }

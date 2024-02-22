import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/products
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(404)
    throw new Error('no order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get Order By Id
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  //populate user relation in order
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

// @desc    Update Order to paid
// @route   GET /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //populate user relation in order
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

// @desc    Get logged in user order
// @route   GET /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  //populate user relation in order
  console.log(req)
  const order = await Order.find({ user: req.user._id })

  res.json(order)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
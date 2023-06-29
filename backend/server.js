import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
// import products from './data/product.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.get('/test', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
// direct routes
// app.get('/api/products', (req, res) => {
//   //convert array object to json
//   res.status(200).json(products)
// })

// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id)
//   res.json(product)
// })

//error catcher tester
// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next()
// })

// app.use((req, res, next) => {
//   const error = new Error(`not found - ${req.originalUrl}`)
//   res.status(404)
//   next(error)
// })

app.use(notFound)
app.use(errorHandler)

// error handler
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//   res.status(statusCode)
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   })
// })

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

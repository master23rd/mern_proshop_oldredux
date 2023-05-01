const express = require('express')
const products = require('./data/product')

const app = express()
app.get('/test', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  //convert array object to json
  res.status(200).json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(5000, console.log(`server running on port 5000`))

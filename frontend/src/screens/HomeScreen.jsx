import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import products from '../products'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
// import axios from 'axios'

const HomeScreen = () => {
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    // direct use useEffect
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetchProducts()

    //using reducer
    dispatch(listProducts())
  }, [dispatch])

  //for testing before using useSelector
  // const products = []

  return (
    <>
      <h1>latest product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{product.name}</h3> */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen

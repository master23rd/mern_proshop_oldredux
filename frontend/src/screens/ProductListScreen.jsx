import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deleteProduct,
  listProducts,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {
  //define configure (dispatch, navigate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pageNumber } = useParams()

  //get reducer state
  const productList = useSelector((state) => state.productList)
  const { loading, products, error, pages, page } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //useEffect
  useEffect(() => {
    // reset previous state create
    dispatch({ type: PRODUCT_CREATE_RESET })

    // old
    // if (userInfo && userInfo.isAdmin) {
    //   dispatch(listProducts())
    // } else {
    //   navigate('/login')
    // }

    // if not admin redict back to login
    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    // if create success navigate edit page (testing) >> flow: create - success - edit page
    // else fetch all list products
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, pageNumber])

  //delete function
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //Delete Product
      dispatch(deleteProduct(id))
    }
  }

  //create function
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'>Create Product</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
        </>
      )}
    </>
  )
}

export default ProductListScreen

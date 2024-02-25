/* eslint-disable react/prop-types */
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = (props) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* standrd link anchor */}
      {/* <a href={`/product/${props.product._id}`}> */}

      {/* react-router anchor - will make single page routing without refresh */}
      <Link to={`/product/${props.product._id}`}>
        {/* this image only get from root fe/public/ folder */}
        <Card.Img src={props.product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${props.product._id}`}>
          <Card.Title as='div'>
            <strong>{props.product.name}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as='div'>
          <div className='my-3'>
            {props.product.rating} from {props.product.numReviews}
          </div>
        </Card.Text> */}

        <Card.Text as='div'>
          <Rating
            value={props.product.rating}
            text={`${props.product.numReviews} reviews`}
            // color={'red'}
          />
        </Card.Text>

        <Card.Text as='h3'>${props.product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

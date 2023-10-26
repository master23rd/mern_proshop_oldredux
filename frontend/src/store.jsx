import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
} from './reducer/productReducer'
import { cartReducer } from './reducer/cartReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListeReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducer/userReducer'
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListMyReducer,
} from './reducer/orderReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userList: userListeReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

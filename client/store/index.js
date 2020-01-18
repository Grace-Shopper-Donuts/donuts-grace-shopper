import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducers/user'
import singleProduct from './reducers/singleProduct'
import allProducts from './reducers/allProducts'
import orders from './reducers/orders'
import orderProducts from './reducers/orderProducts'
import cartProducts from './reducers/cartProducts'

const reducer = combineReducers({
  user,
  singleProduct,
  allProducts,
  orderProducts,
  cartProducts,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/user'

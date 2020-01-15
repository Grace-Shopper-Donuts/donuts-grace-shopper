import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducers/user'
import singleProduct from './reducers/singleProduct'
import allProducts from './reducers/allProducts'
import orders from './reducers/orders'

const reducer = combineReducers({user, singleProduct, allProducts, orders})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/user'

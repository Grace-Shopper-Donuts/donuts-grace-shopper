import axios from 'axios'

const ADD_ORDER_PRODUCT = 'ADD_ORDER_PRODUCT'
const GOT_CART_PRODUCTS = 'GOT_CART_PRODUCTS '

const addedProduct = product => ({
  type: ADD_ORDER_PRODUCT,
  product
})

export const addOrderProductToCart = productId => {
  return async dispatch => {
    try {
      const newOrderProduct = await axios.post('/api/orderProduct/cart', {
        productId
      })
      dispatch(addedProduct(newOrderProduct))
    } catch (err) {
      console.log(err)
    }
  }
}

const gotCartProducts = cartProducts => ({
  type: GOT_CART_PRODUCTS,
  cartProducts
})

export const getCartProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orderProduct/cart')
      dispatch(gotCartProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

var initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_PRODUCT:
      return state.concat(action.product)
    case GOT_CART_PRODUCTS:
      return JSON.parse(JSON.stringify([...action.cartProducts]))
    default:
      return state
  }
}

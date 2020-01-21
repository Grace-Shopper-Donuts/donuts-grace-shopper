import axios from 'axios'

let initialState = []

const GOT_CART_PRODUCTS = 'GOT_CART_PRODUCTS'
const ADD_ORDER_PRODUCT = 'ADD_ORDER_PRODUCT'

const addedProduct = product => ({
  type: ADD_ORDER_PRODUCT,
  product
})

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

export const addOrderProductToCart = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orderProduct/cart', {
        productId
      })
      dispatch(addedProduct(data))
      dispatch(getCartProducts())
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteCartProduct = (productId, orderId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderProduct/order/${orderId}/${productId}`)
      dispatch(getCartProducts())
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartProductQuantity = (productId, newQuantity, orderId) => {
  return async dispatch => {
    try {
      await axios.put('/api/orderProduct/cart', {
        productId,
        orderId,
        newQuantity
      })
      dispatch(getCartProducts())
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_PRODUCT:
      return [...state]
    case GOT_CART_PRODUCTS:
      return action.cartProducts
    default:
      return state
  }
}

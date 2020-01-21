import axios from 'axios'

let initialState = []

const ADD_ORDER_PRODUCT = 'ADD_ORDER_PRODUCT'
const GOT_ORDER_PRODUCTS = 'GOT_ORDER_PRODUCTS'

const gotOrderProducts = orderProducts => ({
  type: GOT_ORDER_PRODUCTS,
  orderProducts
})

export const getOrderProducts = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orderProduct/order/${orderId}`)
      dispatch(gotOrderProducts(data))
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

export const updateCartProductQuantity = (productId, orderId, newQuantity) => {
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
    case GOT_ORDER_PRODUCTS:
      return action.orderProducts
    default:
      return state
  }
}

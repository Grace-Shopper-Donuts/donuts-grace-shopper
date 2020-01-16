import axios from 'axios'

let initialState = []

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

const gotCartProducts = orderProducts => ({
  type: GOT_CART_PRODUCTS,
  orderProducts
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
    console.log(productId, orderId, newQuantity)
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
      return state.concat(action.product)
    case GOT_CART_PRODUCTS:
      return action.orderProducts
    default:
      return state
  }
}

import axios from 'axios'

const ADD_ORDER_PRODUCT = 'ADD_ORDER_PRODUCT'

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

var initialState = []

export const orderProducts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_PRODUCT:
      return state.concat(action.product)
    default:
      return state
  }
}

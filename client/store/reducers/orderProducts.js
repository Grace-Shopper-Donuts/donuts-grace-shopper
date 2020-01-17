import axios from 'axios'

let initialState = []

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

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDER_PRODUCTS:
      return action.orderProducts
    default:
      return state
  }
}

import axios from 'axios'

const initialState = []

const GOT_PAST_ORDERS = 'GOT_PAST_ORDERS'

const gotPastOrders = orders => {
  return {
    type: GOT_PAST_ORDERS,
    orders
  }
}

export const getPastOrders = userId => {
  return async dispatch => {
    let {data} = await axios.get(`/api/orders/user/${userId}`)
    data = data.filter(order => order.completed)
    dispatch(gotPastOrders(data))
  }
}

// need to dispatch a different thing here to reload checkout page

export const checkoutCart = (orderId, userId, cartProducts) => {
  return async dispatch => {
    await axios.put(`/api/orders/checkout`, {orderId, userId, cartProducts})
    dispatch(getPastOrders(userId))
  }
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PAST_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orders

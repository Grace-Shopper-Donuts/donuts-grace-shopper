import axios from 'axios'

const initialState = []

const GOT_PAST_ORDERS = 'GOT_PAST_ORDERS'

const gotPastOrders = orders => {
  return {
    type: GOT_PAST_ORDERS,
    orders
  }
}

export const getPastOrders = id => {
  return async dispatch => {
    let {data} = await axios.get(`/api/orders/user/${id}`)
    data = data.filter(order => order.completed)
    dispatch(gotPastOrders(data))
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

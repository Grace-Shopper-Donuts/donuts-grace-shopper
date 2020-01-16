import React from 'react'

export const OrderHistoryItem = props => {
  const {order} = props
  return (
    <div className="orderHistoryItem">
      <h3>Order ID: {order.id}</h3>
      <h3>Total Price: {order.totalPrice}</h3>
      <h3>Order Date: {order.createdAt.slice(0, 10)}</h3>
      <button>Details</button>
    </div>
  )
}

export default OrderHistoryItem

import React from 'react'

const OrderHistoryDetails = props => {
  const {orderProducts, evenOrOdd} = props
  return (
    <div className={`orderHistoryDetails${evenOrOdd}`}>
      <ol>
        {orderProducts.map(orderProduct => {
          return (
            <li
              key={orderProduct.productId}
              className="orderHistoryDetailsItem"
            >
              <p>{orderProduct.product.name}</p>
              <p>{orderProduct.product.manufacturer}</p>
              <p>Quantity: {orderProduct.quantity}</p>
              <p>Price: {orderProduct.checkoutPrice / 100}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default OrderHistoryDetails

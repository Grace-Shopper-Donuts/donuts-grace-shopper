import React from 'react'

const OrderHistoryDetails = props => {
  const {orderProducts} = props
  return (
    <div className="orderHistoryDetails">
      <ol>
        test
        {/* {orderProducts.map(orderProduct => {
          return (
            <li key={orderProduct.productId}>
              {orderProduct.product.name}
              Quantity: {orderProduct.quantity}
              Price: {orderProduct.checkoutPrice}
            </li>
          )
        })} */}
      </ol>
    </div>
  )
}

export default OrderHistoryDetails

import React from 'react'

const CartProduct = props => {
  let {product} = props
  const orderProduct = product
  product = product.product

  return (
    <div>
      <img src={product.imgPath} />
      <h2>{product.name}</h2>
      <h2>Quantity: {orderProduct.quantity}</h2>
    </div>
  )
}

export default CartProduct

import React from 'react'

export const CartProduct = props => {
  let {product} = props
  const orderProduct = product
  product = product.product

  console.log(product)

  return (
    <div>
      <img src={product.imgPath} />
      <h2>{product.name}</h2>
      <h2>Quantity: {orderProduct.quantity}</h2>
    </div>
  )
}

export default CartProduct

import React from 'react'

export const CartProduct = props => {
  let {product} = props
  const orderProduct = product
  product = product.product

  return (
    <div className="cartProduct">
      <img src={product.imgPath} />
      <h2>{product.name}</h2>
      <h2>Quantity: {orderProduct.quantity}</h2>
      <div>
        <button>-</button>
        <button>+</button>
        <button>X</button>
      </div>
    </div>
  )
}

export default CartProduct

import React from 'react'
import {Link} from 'react-router-dom'

export const CartProduct = props => {
  let {product, deleteCartProduct, updateCartProductQuantity} = props
  const orderProduct = product
  const {productId, orderId} = orderProduct
  product = product.product

  return (
    <div className="cartProduct">
      <Link to={`/products/${productId}`}>
        <img src={product.imgPath} />
      </Link>
      <h2>{product.name}</h2>
      <h2>Quantity: {orderProduct.quantity}</h2>
      <div>
        <button
          type="button"
          onClick={() =>
            updateCartProductQuantity(
              productId,
              orderId,
              orderProduct.quantity - 1
            )
          }
        >
          -
        </button>
        <button
          type="button"
          onClick={() =>
            updateCartProductQuantity(
              productId,
              orderId,
              orderProduct.quantity + 1
            )
          }
        >
          +
        </button>
        <button
          type="button"
          onClick={() => deleteCartProduct(productId, orderId)}
        >
          X
        </button>
      </div>
    </div>
  )
}

export default CartProduct

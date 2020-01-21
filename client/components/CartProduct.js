import React from 'react'
import {Link} from 'react-router-dom'

export const CartProduct = props => {
  let {
    product,
    index,
    deleteCartProduct,
    updateCartProductQuantity,
    isLoggedIn
  } = props

  console.log('GUEST PRODUCT', product)
  console.log('ISLOGGEDIN', isLoggedIn)

  const orderProduct = product

  if (isLoggedIn) {
    product = product.product
    var {productId, orderId} = orderProduct
  } else {
    var productId = product.id
  }

  return (
    <div className={`cartProduct${index}`}>
      <Link to={`/products/${productId}`}>
        <img src={`/${product.imgPath}`} />
      </Link>
      <h3>{product.name}</h3>
      <h3>{product.manufacturer}</h3>
      <h3>${product.price / 100}</h3>
      <h3>Quantity: {orderProduct.quantity}</h3>
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

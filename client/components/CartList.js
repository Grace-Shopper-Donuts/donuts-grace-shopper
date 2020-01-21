import React from 'react'
import {connect} from 'react-redux'
import {
  getCartProducts,
  deleteCartProduct,
  updateCartProductQuantity
} from '../store/reducers/cartProducts'
import {
  getGuestCartProducts,
  removeGuestProduct,
  updateGuestProduct
} from '../store/reducers/guestCartProducts'
import CartProduct from './CartProduct'
import {Link} from 'react-router-dom'

class CartList extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCartProducts()
    } else {
      this.props.getGuestCartProducts()
    }
  }

  render() {
    const {
      cartProducts,
      deleteCartProduct,
      updateCartProductQuantity,
      removeGuestProduct,
      updateGuestProduct,
      isLoggedIn
    } = this.props

    console.log(updateGuestProduct)

    return (
      <div id="cartListPage">
        <div id="cartListLeft">
          {isLoggedIn
            ? cartProducts.map((product, index) => {
                return (
                  <CartProduct
                    key={product.productId}
                    index={index % 2}
                    product={product}
                    deleteCartProduct={deleteCartProduct}
                    updateCartProductQuantity={updateCartProductQuantity}
                    isLoggedIn
                  />
                )
              })
            : Object.values(this.props.guestCartProducts).map(
                (product, index) => {
                  return (
                    <CartProduct
                      key={product.id}
                      index={index % 2}
                      product={product}
                      deleteCartProduct={removeGuestProduct}
                      updateCartProductQuantity={updateGuestProduct}
                      isLoggedIn={false}
                    />
                  )
                }
              )}
        </div>
        <div id="cartListRight">
          <h1>Cart Details</h1>
          <h2>
            Number of items:{' '}
            {cartProducts.reduce((a, b) => Number(a) + Number(b.quantity), 0)}
          </h2>
          <h2>
            Order Total: $
            {cartProducts.reduce(
              (a, b) =>
                Number(a) + Number(b.product.price) * Number(b.quantity),
              0
            ) / 100}
          </h2>
          <Link to="/checkout">
            <button type="button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartProducts: state.cartProducts,
    guestCartProducts: state.guestCartProducts,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    deleteCartProduct: (productId, orderId) =>
      dispatch(deleteCartProduct(productId, orderId)),
    updateCartProductQuantity: (productId, orderId, newQuantity) =>
      dispatch(updateCartProductQuantity(productId, orderId, newQuantity)),
    getGuestCartProducts: () => dispatch(getGuestCartProducts()),
    removeGuestProduct: productId => dispatch(removeGuestProduct(productId)),
    updateGuestProduct: (productId, newQuantity) =>
      dispatch(updateGuestProduct(productId, newQuantity))
  }
}

export default connect(mapState, mapDispatch)(CartList)

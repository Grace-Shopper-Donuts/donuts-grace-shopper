import React from 'react'
import {connect} from 'react-redux'
import {
  getCartProducts,
  deleteCartProduct,
  updateCartProductQuantity
} from '../store/reducers/cartProducts'
import CartProduct from './CartProduct'
import {Link} from 'react-router-dom'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getCartProducts()
  }

  render() {
    const {
      cartProducts,
      deleteCartProduct,
      updateCartProductQuantity
    } = this.props
    return (
      <div id="cartListPage">
        <div id="cartListLeft">
          {cartProducts.map((product, index) => {
            return (
              <CartProduct
                key={product.productId}
                index={index % 2}
                product={product}
                deleteCartProduct={deleteCartProduct}
                updateCartProductQuantity={updateCartProductQuantity}
              />
            )
          })}
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
    cartProducts: state.cartProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    deleteCartProduct: (productId, orderId) =>
      dispatch(deleteCartProduct(productId, orderId)),
    updateCartProductQuantity: (productId, orderId, newQuantity) =>
      dispatch(updateCartProductQuantity(productId, orderId, newQuantity))
  }
}

export default connect(mapState, mapDispatch)(CartList)

import React from 'React'
import {connect} from 'react-redux'
import {
  getCartProducts,
  deleteCartProduct,
  updateCartProductQuantity
} from '../store/reducers/orderProducts'
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
          {cartProducts.map(product => {
            return (
              <CartProduct
                key={product.productId}
                product={product}
                deleteCartProduct={deleteCartProduct}
                updateCartProductQuantity={updateCartProductQuantity}
              />
            )
          })}
        </div>
        <div id="cartListRight">
          <h2>Number of items: {cartProducts.length}</h2>
          <h2>
            Order Total:{' '}
            {cartProducts.reduce(
              (a, b) => Number(a) + Number(b.product.price),
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
    cartProducts: state.orderProducts
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

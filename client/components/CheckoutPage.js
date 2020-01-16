import React from 'React'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartProducts} from '../store/reducers/orderProducts'
import {checkoutCart} from '../store/reducers/orders'

class CheckoutPage extends React.Component {
  constructor() {
    super()

    this.state = {
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCartProducts()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {user, cartProducts} = this.props
    this.props.checkoutCart(cartProducts[0].orderId, user.id)
    this.props.getCartProducts()
  }

  render() {
    const {cartProducts} = this.props

    return (
      <div id="checkoutPage">
        <form onSubmit={this.handleSubmit}>
          <div id="checkoutPageLeft">
            <div>
              <h2>Shipping Adress</h2>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <h2>Payment Method</h2>
            </div>
            <div>
              <h2>Review Items</h2>
            </div>
          </div>
          <div id="checkoutPageRight">
            <Link to="/cart">
              <button type="button">Return to Cart</button>
            </Link>
            <button type="submit">Place Your Order</button>
            <h2>Order Summary</h2>
            <h3>Number of items: {cartProducts.length}</h3>
            <h3>Shipping: $0.00</h3>
            <h3>Tax: $0.00</h3>
            <h2>
              Order Total:{' '}
              {cartProducts.reduce(
                (a, b) => Number(a) + Number(b.product.price),
                0
              ) / 100}
            </h2>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartProducts: state.orderProducts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    checkoutCart: (orderId, userId) => dispatch(checkoutCart(orderId, userId))
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)

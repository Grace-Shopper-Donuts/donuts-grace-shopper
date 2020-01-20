import React from 'React'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkoutCart} from '../store/reducers/orders'

class CheckoutPage extends React.Component {
  constructor() {
    super()

    this.state = {
      shippingInfo: {
        address: '',
        city: '',
        state: '',
        zipCode: ''
      },
      paymentInfo: {
        cardHolderName: '',
        cardNumber: '',
        expiration: '',
        securityCode: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // this.props.getCartProducts()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {user, cartProducts, checkoutCart} = this.props
    checkoutCart(cartProducts[0].orderId, user.id, cartProducts)
    this.setState({
      shippingInfo: {
        address: '',
        city: '',
        state: '',
        zipCode: ''
      },
      paymentInfo: {
        cardNumber: '',
        expiration: '',
        securityCode: ''
      }
    })
  }

  render() {
    const {cartProducts} = this.props
    const {shippingInfo, paymentInfo} = this.state
    return (
      <form onSubmit={this.handleSubmit} id="checkoutPage">
        <div id="checkoutPageLeft">
          <div id="checkoutShippingInfo">
            <h2>Shipping Information</h2>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="zip">Zipcode:</label>
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div id="checkoutPaymentInfo">
            <h2>Payment Method</h2>
            <div>
              <label htmlFor="cardHolderName">Name:</label>
              <input
                type="text"
                name="cardHolderName"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="expiration">Expiration Date:</label>
              <input
                type="text"
                name="expiration"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="securityCode">Security Code:</label>
              <input
                type="text"
                name="security Code"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div id="checkoutReviewOrder">
            <h2>Review Items</h2>
            <ol>
              {cartProducts.map(product => {
                return (
                  <li key={product.productId}>
                    {product.product.name}
                    Quantity: {product.quantity}
                    Price: ${product.product.price / 100}
                  </li>
                )
              })}
            </ol>
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
            Order Total: $
            {cartProducts.reduce(
              (a, b) => Number(a) + Number(b.product.price),
              0
            ) / 100}
          </h2>
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    cartProducts: state.cartProducts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutCart: (orderId, userId, cartProducts) =>
      dispatch(checkoutCart(orderId, userId, cartProducts))
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)

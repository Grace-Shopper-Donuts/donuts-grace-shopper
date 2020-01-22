import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkoutCart} from '../store/reducers/orders'
import {getCartProducts} from '../store/reducers/cartProducts'

class CheckoutPage extends React.Component {
  constructor() {
    super()

    this.state = {
      shippingInfo: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      paymentInfo: {
        cardHolderName: '',
        cardNumber: '',
        expiration: '',
        securityCode: '',
        promoCode: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()

    let checkoutProducts
    if (!this.props.isLoggedIn) {
      const valArr = Object.values(this.props.guestCartProducts)
      const restructured = []
      for (let i = 0; i < valArr.length; i++) {
        restructured.push({
          quantity: valArr[i].quantity,
          productId: valArr[i].id,
          product: {
            id: valArr[i].id,
            name: valArr[i].name,
            manufacturer: valArr[i].manufacturer,
            price: valArr[i].price,
            stock: valArr[i].stock,
            description: valArr[i].description,
            imgPath: valArr[i].imgPath
          }
        })
      }
      checkoutProducts = restructured
    } else checkoutProducts = this.props.cartProducts

    // const {user, cartProducts, checkoutCart, getCartProducts} = this.props
    const {user, checkoutCart, getCartProducts} = this.props
    // await checkoutCart(cartProducts[0].orderId, user.id, cartProducts)
    const orderId = this.props.isLoggedIn
      ? checkoutProducts[0].orderId
      : undefined
    await checkoutCart(orderId, 1, checkoutProducts) // guests will use user id 0
    localStorage.setItem('cartProducts', '{}')
    await getCartProducts()
  }

  render() {
    let checkoutProducts
    if (!this.props.isLoggedIn) {
      const valArr = Object.values(this.props.guestCartProducts)
      const restructured = []
      for (let i = 0; i < valArr.length; i++) {
        restructured.push({
          quantity: valArr[i].quantity,
          productId: valArr[i].productId,
          product: {
            id: valArr[i].id,
            name: valArr[i].name,
            manufacturer: valArr[i].manufacturer,
            price: valArr[i].price,
            stock: valArr[i].stock,
            description: valArr[i].description,
            imgPath: valArr[i].imgPath
          }
        })
      }
      checkoutProducts = restructured
    } else checkoutProducts = this.props.cartProducts
    // const {cartProducts} = this.props
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
                // value={shippingInfo.address}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                // value={shippingInfo.city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                name="state"
                // value={shippingInfo.state}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zipcode:</label>
              <input
                type="text"
                name="zipCode"
                // value={shippingInfo.zipCode}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                name="country"
                // value={shippingInfo.country}
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
                name="securityCode"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="promoCode">Promo Code:</label>
              <input
                type="text"
                name="promoCode"
                // value={paymentInfo.cardNumber}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div id="checkoutReviewOrder">
            <h2>Review Items</h2>
            <ol>
              {checkoutProducts.map(product => {
                return (
                  <li key={product.productId} className="checkoutListItem">
                    <p>{product.product.name}</p>
                    <p>{product.product.manufacturer}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ${product.product.price / 100}</p>
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
          <h2>Order Summary</h2>
          <h3>Number of items: {checkoutProducts.length}</h3>
          <h3>Shipping: $0.00</h3>
          <h3>Tax: $0.00</h3>
          <h2 id="cehckoutPageTotal">
            Order Total: $
            {checkoutProducts.reduce(
              (a, b) => Number(a) + Number(b.product.price),
              0
            ) / 100}
          </h2>
          <button type="submit">Place Your Order</button>
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    cartProducts: state.cartProducts,
    guestCartProducts: state.guestCartProducts,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutCart: (orderId, userId, cartProducts) =>
      dispatch(checkoutCart(orderId, userId, cartProducts)),
    getCartProducts: () => dispatch(getCartProducts())
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartProducts, guestCartProducts}) => {
  var cartQuantity
  if (isLoggedIn) {
    cartQuantity = cartProducts.reduce((a, b) => a + b.quantity, 0)
  }
  const numItemsInGuestCart = Object.values(guestCartProducts).reduce(
    (a, b) => a + b.quantity,
    0
  )
  return (
    <div>
      <nav id="navbar">
        <div id="navLeft">
          <Link to="/">
            <img src="/youTuba_logo.png" id="logoImg" />
          </Link>
        </div>

        <div id="navCenter">
          <Link to="/products">All Products</Link>
        </div>

        {isLoggedIn ? (
          <div id="navRight">
            <div className="navRightSub">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
            <div className="navRightSub">
              <Link to="/account">
                <img src="userIcon.png" className="userIcon" />
              </Link>
            </div>
            <Link to="/cart">
              <div id="cartIconAndCount" className="navRightSub">
                <img src="cartIcon.png" className="cartIcon" />
                <div className="cartCount">
                  {cartProducts.reduce((a, b) => a + b.quantity, 0)}
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div id="navRight">
            <div className="navRightSub">
              <Link to="/login">Login</Link>
            </div>
            <div className="navRightSub">
              <Link to="/signup">Sign Up</Link>
            </div>
            <Link to="/cart">
              <div id="cartIconAndCount" className="navRightSub">
                <img src="cartIcon.png" className="cartIcon" />
                <div className="cartCount">{numItemsInGuestCart}</div>
              </div>
            </Link>
          </div>
        )}

        <label htmlFor="toggle">&#9776;</label>
        <input type="checkbox" id="toggle" />
      </nav>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartProducts: state.cartProducts,
    guestCartProducts: state.guestCartProducts
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

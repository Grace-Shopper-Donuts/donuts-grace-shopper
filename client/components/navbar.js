import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartProducts}) => {
  const cartQuantity = cartProducts.reduce((a, b) => a + b.quantity, 0)
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
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/account">
              <img src="userIcon.png" className="userIcon" />
            </Link>
            <Link to="/cart">
              <div className="cartIconAndCount">
                <img src="cartIcon.png" className="cartIcon" />
                <div className="cartCount">{cartQuantity}</div>
              </div>
            </Link>
          </div>
        ) : (
          <div id="navRight">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">
              <div className="cartIconAndCount">
                <img src="cartIcon.png" className="cartIcon" />
                <div className="cartCount">{cartQuantity}</div>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartProducts: state.cartProducts
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

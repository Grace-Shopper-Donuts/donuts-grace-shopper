import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav id="navbar">
      <div id="navLeft">
        <Link to="/">
          <img src="/youTuba_logo.png" id="logoImg" />
        </Link>
      </div>

      {isLoggedIn ? (
        <div id="navRight">
          {/* The navbar will show these links after you log in */}
          {/* <input type="text" name="search" placeholder="Search" /> */}
          <Link to="/account">Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">All Products</Link>
          <Link to="/cart"> My Cart </Link>
        </div>
      ) : (
        <div id="navRight">
          {/* The navbar will show these links before you log in */}
          {/* <input type="text" name="search" placeholder="Search" /> */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart"> My Cart </Link>
        </div>
      )}
      <label htmlFor="toggle">&#9776;</label>
      <input type="checkbox" id="toggle" />
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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

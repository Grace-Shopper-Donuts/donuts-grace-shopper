import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import AllProductsContainer from './components/AllProducts'
import {me} from './store'
import SingleProduct from './components/singleProduct'
import HomePage from './components/HomePage'
import AccountPage from './components/AccountPage'
import OrderHistory from './components/OrderHistory'
import CartList from './components/CartList'
import CheckoutPage from './components/CheckoutPage'
import {getCartProducts} from './store/reducers/cartProducts'
import {getGuestCartProducts} from './store/reducers/guestCartProducts'
import OrderConfirmation from './components/OrderConfirmation'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.loadInitialData()
    } else {
      this.props.loadGuestData()
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={AllProductsContainer} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/cart" component={CartList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/orderConfirmation" component={OrderConfirmation} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={AccountPage} />
            <Route path="/orderHistory" component={OrderHistory} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    cartProducts: state.cartProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getCartProducts())
    },
    loadGuestData() {
      dispatch(me())
      dispatch(getGuestCartProducts())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

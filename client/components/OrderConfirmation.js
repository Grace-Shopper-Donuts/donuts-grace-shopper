import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="orderConfirmation">
        <h1>Your order was completed successfully!</h1>
        <h2>Thank You!</h2>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(OrderConfirmation)

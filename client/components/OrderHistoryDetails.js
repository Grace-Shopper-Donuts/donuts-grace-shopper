import React from 'react'
import {connect} from 'react-redux'
import {getOrderProducts} from '../store/reducers/orderProducts'

class OrderHistoryDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderProducts: []
    }
  }

  componentDidMount() {
    if (this.props.orderProducts.length) {
      console.log('secondTime')
      this.setState({
        orderProducts: this.props.orderProducts
      })
    }
    if (!this.state.orderProducts.length) {
      console.log('firstTime')
      this.props.getOrderProducts(this.props.order.id)
    }
  }

  render() {
    const {orderProducts} = this.state
    return (
      <div className="orderHistoryDetails">
        <ol>
          {orderProducts.map(orderProduct => {
            return (
              <li key={orderProduct.productId}>
                {orderProduct.product.name}
                Quantity: {orderProduct.quantity}
                Price: {orderProduct.checkoutPrice}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderProducts: state.orderProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getOrderProducts: id => dispatch(getOrderProducts(id))
  }
}

export default connect(mapState, mapDispatch)(OrderHistoryDetails)

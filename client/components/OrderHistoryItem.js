import React from 'react'
import {connect} from 'react-redux'
import {getOrderProducts} from '../store/reducers/orderProducts'
import OrderHistoryDetails from './OrderHistoryDetails'

class OrderHistoryItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      evenOrOdd: 0,
      orderProducts: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {order, index} = this.props
    this.props.getOrderProducts(order.id)
    this.setState({
      evenOrOdd: index % 2
    })
  }

  handleClick() {
    this.setState({
      showDetails: !this.state.showDetails,
      orderProducts: this.props.orderProducts
    })
  }

  render() {
    const {order} = this.props,
      {evenOrOdd} = this.state
    return (
      <div>
        <div className={`orderHistoryItem${evenOrOdd}`}>
          <h3>Order ID: {order.id}</h3>
          <h3>Total Price: {order.totalPrice}</h3>
          <h3>Order Date: {order.createdAt.slice(0, 10)}</h3>
          <button type="button" onClick={this.handleClick}>
            Details
          </button>
        </div>
        {this.state.showDetails ? (
          <OrderHistoryDetails key={order.Id} order={order} />
        ) : (
          ''
        )}
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

export default connect(mapState, mapDispatch)(OrderHistoryItem)

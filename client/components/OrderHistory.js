import React from 'React'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router'
import {getPastOrders} from '../store/reducers/orders'
import OrderHistoryItem from './OrderHistoryItem'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.me()
    this.props.getPastOrders(this.props.user.id)
  }

  render() {
    const {user, orders} = this.props
    return (
      <div id="orderHistory">
        <div id="orderHistoryLeft">
          {orders.map(order => {
            return <OrderHistoryItem key={order.id} order={order} />
          })}
        </div>
        <div id="orderHistoryRight">
          <h1>
            {user.firstName} {user.lastName}'s Order History
          </h1>
          <h2>Number of Orders: {orders.length}</h2>
          <h2>
            Total Spending:
            {orders
              .reduce((a, b) => Number(a) + Number(b.totalPrice), 0)
              .toFixed(2)}
          </h2>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
    getPastOrders: id => dispatch(getPastOrders(id))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)

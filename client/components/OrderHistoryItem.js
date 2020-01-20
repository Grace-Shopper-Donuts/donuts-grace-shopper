import React from 'react'
import OrderHistoryDetails from './OrderHistoryDetails'

class OrderHistoryItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      evenOrOdd: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {index} = this.props
    this.setState({
      evenOrOdd: index % 2
    })
  }

  handleClick() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    const {order} = this.props,
      {evenOrOdd} = this.state
    return (
      <div>
        <div className={`orderHistoryItem${evenOrOdd}`}>
          <h3>Order ID: {order.id}</h3>
          <h3>
            Total Price: $
            {order.orderProducts.reduce(
              (a, b) => a + b.checkoutPrice * b.quantity,
              0
            ) / 100}
          </h3>
          <h3>Order Date: {order.createdAt.slice(0, 10)}</h3>
          <button type="button" onClick={this.handleClick}>
            Details
          </button>
        </div>
        {this.state.showDetails ? (
          <OrderHistoryDetails
            key={order.Id}
            orderProducts={order.orderProducts}
            evenOrOdd={evenOrOdd}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default OrderHistoryItem

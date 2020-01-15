import React from 'React'
import {connect} from 'react-redux'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        {this.props.cartProducts.map(product => {
          return <p key={product.id}>{product.name}</p>
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    addOrderProductToCart: () => dispatch(addOrderProductToCart())
  }
}

const CartListContainer = connect(mapState, mapDispatch)(CartList)
export default CartListContainer

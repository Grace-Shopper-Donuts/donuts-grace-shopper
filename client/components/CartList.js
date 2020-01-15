import React from 'React'
import {connect} from 'react-redux'
import {getCartProducts} from '../store/reducers/orderProducts'
import CartProduct from './CartProduct'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getCartProducts()
  }

  render() {
    const {cartProducts} = this.props
    return (
      <div>
        {cartProducts.map(product => {
          return <CartProduct key={product.productId} product={product} />
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartProducts: state.orderProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts())
  }
}

export default connect(mapState, mapDispatch)(CartList)

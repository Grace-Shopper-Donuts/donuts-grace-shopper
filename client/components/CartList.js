import React from 'React'
import {connect} from 'react-redux'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return <ProductThumb key={product.id} product={product} />
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
    getAllProducts: () => dispatch(getAllProducts())
  }
}

const CartListContainer = connect(mapState, mapDispatch)(CartList)
export default CartListContainer

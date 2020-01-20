import React from 'react'
import ProductThumb from './ProductThumb'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/reducers/allProducts'
import {addOrderProductToCart} from '../store/reducers/cartProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  addToCart(id) {
    event.preventDefault()
    this.props.addOrderProductToCart(id)
  }

  render() {
    return (
      <div id="allProducts">
        {this.props.products.map(product => {
          return (
            <ProductThumb
              key={product.id}
              product={product}
              addToCart={() => this.addToCart(product.id)}
            />
          )
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
    getAllProducts: () => dispatch(getAllProducts()),
    addOrderProductToCart: id => dispatch(addOrderProductToCart(id))
  }
}

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsContainer

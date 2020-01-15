import React from 'React'
import ProductThumb from './ProductThumb'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/reducers/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div id="allProducts">
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

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsContainer

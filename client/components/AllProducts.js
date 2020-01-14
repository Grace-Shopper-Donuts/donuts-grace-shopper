import React from 'React'
import ProductThumb from './ProductThumb'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
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

const mapState = function(state) {
  return {
    products: state.products
  }
}

const mapDispatch = function(dispatch) {
  return {
    getProducts: function() {
      const action = getProducts()
      dispatch(action)
    }
  }
}

const componentCreator = connect(mapState, mapDispatch)
const AllProductsContainer = componentCreator(AllProducts)
export default AllProductsContainer

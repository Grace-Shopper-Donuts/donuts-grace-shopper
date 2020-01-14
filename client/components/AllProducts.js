import React from 'React'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/reducers/allProducts'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const {products} = this.props
    console.log(this.props)
    return (
      <div>
        {products.map(product => {
          return <div key={product.id}>{product.name}</div>
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

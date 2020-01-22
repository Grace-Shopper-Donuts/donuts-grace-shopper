import React from 'react'
import ProductThumb from './ProductThumb'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/reducers/allProducts'
import {addOrderProductToCart} from '../store/reducers/cartProducts'
import {addGuestProductToCart} from '../store/reducers/guestCartProducts'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  addToCart(idOrProduct) {
    event.preventDefault()
    if (this.props.isLoggedIn) {
      this.props.addOrderProductToCart(idOrProduct)
    } else {
      this.props.addGuestProductToCart(idOrProduct)
    }
  }

  render() {
    return (
      <div id="allProducts">
        {this.props.products.map(product => {
          return (
            <ProductThumb
              key={product.id}
              product={product}
              addToCart={
                this.props.isLoggedIn
                  ? () => this.addToCart(product.id)
                  : () => this.addToCart(product)
              }
            />
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addOrderProductToCart: id => dispatch(addOrderProductToCart(id)),
    addGuestProductToCart: product => dispatch(addGuestProductToCart(product))
  }
}

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsContainer

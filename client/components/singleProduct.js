import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/reducers/singleProduct'
import {addOrderProductToCart} from '../store/reducers/orderProducts'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct()
  }

  addToCart() {
    event.preventDefault()
    this.props.addOrderProductToCart()
  }

  render() {
    const {name, imgPath, price, description} = this.props.currentProduct
    console.log(imgPath)
    return (
      <div>
        <div>
          <img src={'/' + imgPath} />
        </div>
        <div>
          <div>{name}</div>
          <div>{price}</div>
          <div>{description}</div>
          <button type="submit" onClick={this.addToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    currentProduct: state.singleProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    getSingleProduct: () => dispatch(getSingleProduct(id)),
    addOrderProductToCart: () => dispatch(addOrderProductToCart(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

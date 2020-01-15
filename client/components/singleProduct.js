import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/reducers/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleProduct()
  }

  render() {
    const {name, imgPath, price, description} = this.props.currentProduct
    console.log(imgPath)
    return (
      <div id="singleProduct">
        <div id="singleProductLeft">
          <img src={'/' + imgPath} />
        </div>
        <div id="singleProductRight">
          <h1>{name}</h1>
          <h1>{price}</h1>
          <button className="singleProductButton">ADD TO CART</button>
          <div>{description}</div>
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
    getSingleProduct: () => dispatch(getSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

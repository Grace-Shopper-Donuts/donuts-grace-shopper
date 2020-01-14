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
      <div>
        <div>
          <img src={'/' + imgPath} />
        </div>
        <div>
          <div>{name}</div>
          <div>{price}</div>
          <div>{description}</div>
          <button>ADD TO CART</button>
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

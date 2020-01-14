import React from 'react'
import {Link} from 'react-router-dom'

const ProductThumb = props => {
  const {product} = props

  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <img src={'/' + product.imgPath} />
      </Link>
      <Link to={`/products/${product.id}`}>
        <div>{product.name}</div>
      </Link>
      <div>{product.price}</div>
      <button>ADD TO CART</button>
    </div>
  )
}

export default ProductThumb

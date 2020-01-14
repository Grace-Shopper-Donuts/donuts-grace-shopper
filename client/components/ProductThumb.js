import React from 'react'

const ProductThumb = props => {
  const {product} = props

  return (
    <div>
      <img src={product.imgPath} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <button>ADD TO CART</button>
    </div>
  )
}

export default ProductThumb

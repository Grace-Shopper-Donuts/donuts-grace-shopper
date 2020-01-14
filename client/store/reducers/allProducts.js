import axios from 'axios'

const initialState = []

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

const gotAllProducts = products => {
  return {
    type: GOT_ALL_PRODUCTS,
    products
  }
}

export const getAllProducts = () => {
  console.log('hello')
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    console.log(data)
    dispatch(gotAllProducts(data))
  }
}

const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default allProducts

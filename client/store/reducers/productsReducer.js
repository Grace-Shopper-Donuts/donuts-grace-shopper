import axios from 'axios'

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

const gotAllProducts = (products) => ({
  type: GOT_ALL_PRODUCTS,
  products
})

export const getAllProducts = () => {
  return async(dispatch) => {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  }
}

function allProductsReducer(products = [], action){
  switch(action.type){
    case GOT_ALL_PRODUCTS:
      return action.products
  }
}

export default allProductsReducer

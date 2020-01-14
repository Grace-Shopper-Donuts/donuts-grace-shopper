import axios from 'axios'

// initial state

const initialState = {}

// action type

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

// action creator

export const gotSingleProduct = product => {
  return {
    type: GOT_SINGLE_PRODUCT,
    product
  }
}

// thunk creator

export const getSingleProduct = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  }
}

// reducer

const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProduct

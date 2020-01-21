const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const GOT_GUEST_PRODUCTS = 'GOT_GUEST_PRODUCTS'
const REMOVE_GUEST_PRODUCT = 'REMOVED_GUEST_PRODUCT'

export const addedGuestProduct = products => {
  return {
    type: ADD_GUEST_PRODUCT,
    products
  }
}
export const gotGuestProducts = products => {
  return {
    type: GOT_GUEST_PRODUCTS,
    products
  }
}

export const removedGuestProduct = productId => {
  return {
    type: REMOVE_GUEST_PRODUCT,
    productId
  }
}

export const removeGuestProduct = productId => {
  var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || {}
  cartProducts = {...cartProducts}
  if (Object.keys(cartProducts).length) {
    delete cartProducts[productId]
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }
}

export const addGuestProductToCart = product => {
  var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || {}
  cartProducts = {...cartProducts}
  console.log('cartProducts', cartProducts)
  if (cartProducts[product.id]) {
    cartProducts[product.id].quantity += 1
  } else {
    product.quantity = 1
    cartProducts[product.id] = product
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  console.log(localStorage.getItem('cartProducts'))
  console.log('reached end of thunk')
  console.log('Product', cartProducts[product.id].quantity)
  return addedGuestProduct(cartProducts)
}

export const getGuestCartProducts = () => {
  var products = localStorage.getItem('cartProducts') || {}
  console.log('In Reducer:', products)
  if (Object.keys(products).length) {
    products = JSON.parse(products)
  }
  return gotGuestProducts(products)
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUEST_PRODUCT:
      return action.products
    case GOT_GUEST_PRODUCTS:
      return action.products
    case REMOVE_GUEST_PRODUCT:
      var newState = JSON.parse(JSON.stringify(state))
      delete newState[action.productId]
      return newState
    // case SEND_EMPTY_CART:
    //   return []
    default:
      return state
  }
}

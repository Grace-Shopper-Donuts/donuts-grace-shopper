const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const GOT_GUEST_PRODUCTS = 'GOT_GUEST_PRODUCTS'
const REMOVE_GUEST_PRODUCT = 'REMOVED_GUEST_PRODUCT'
const UPDATE_GUEST_PRODUCT = 'UPDATE_GUEST_PRODUCT'

const addedGuestProduct = products => {
  return {
    type: ADD_GUEST_PRODUCT,
    products
  }
}

const gotGuestProducts = products => {
  return {
    type: GOT_GUEST_PRODUCTS,
    products
  }
}

const removedGuestProduct = productId => {
  return {
    type: REMOVE_GUEST_PRODUCT,
    productId
  }
}

const updatedGuestProduct = products => {
  return {
    type: UPDATE_GUEST_PRODUCT,
    products
  }
}

export const updateGuestProduct = (productId, newQuantity) => {
  var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || {}
  cartProducts = {...cartProducts}
  if (!newQuantity) {
    delete cartProducts[productId]
  } else {
    cartProducts[productId].quantity = newQuantity
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  return updatedGuestProduct(cartProducts)
}

export const removeGuestProduct = productId => {
  var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || {}
  cartProducts = {...cartProducts}
  delete cartProducts[productId]
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  return removedGuestProduct(productId)
}

export const addGuestProductToCart = product => {
  var cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || {}
  cartProducts = {...cartProducts}
  if (cartProducts[product.id]) {
    cartProducts[product.id].quantity += 1
  } else {
    product.quantity = 1
    cartProducts[product.id] = product
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  return addedGuestProduct(cartProducts)
}

export const getGuestCartProducts = () => {
  var products = localStorage.getItem('cartProducts') || {}
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
    case UPDATE_GUEST_PRODUCT:
      return action.products
    default:
      return state
  }
}

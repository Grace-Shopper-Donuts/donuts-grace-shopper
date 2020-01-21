/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartProduct from '../CartProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartProduct component', () => {
  let cartProduct

  beforeEach(() => {
    const ordProd = {
      orderId: 4,
      quantity: 6,
      productId: 8,
      product: {
        id: 8,
        imgPath: 'xylophone.jpg',
        name: 'Xylophone',
        manufacturer: 'testManufacturer',
        price: 9999
      }
    }
    // orderProduct is being passed as a key on prop to CartProduct
    // orderProduct holds product information provided from eager loading
    cartProduct = shallow(<CartProduct product={ordProd} isLoggedIn={true} />)
  })

  it('renders the correct image', () => {
    expect(cartProduct.find('img').prop('src')).to.be.equal('/xylophone.jpg')
  })

  it('renders the correct name, manufacturer, price and quantity', () => {
    expect(
      cartProduct
        .find('h3')
        .at(0)
        .text()
    ).to.be.equal('Xylophone')
    expect(
      cartProduct
        .find('h3')
        .at(1)
        .text()
    ).to.be.equal('testManufacturer')
    expect(
      cartProduct
        .find('h3')
        .at(2)
        .text()
    ).to.be.equal('$99.99')
    expect(
      cartProduct
        .find('h3')
        .at(3)
        .text()
    ).to.be.equal('Quantity: 6')
  })
})

/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {CartProduct} from './CartProduct'

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
        price: 99.99
      }
    }
    // orderProduct is being passed as a key on prop to CartProduct
    // orderProduct holds product information provided from eager loading
    cartProduct = shallow(<CartProduct orderProduct={ordProd} />)
  })

  // it('renders the correct image', () => {
  //   // TODO: update check for current DOM hierarchy
  //   // expect(cartProduct.find('img').prop('src')).to.be.equal('/xylophone.jpg')
  //   // needs to search at root directory for image
  // })

  // it('renders the correct name and price', () => {
  //   // TODO: update check for current DOM hierarchy
  //   // expect(
  //   //   cartProduct
  //   //     .find('h2')
  //   //     .at(0)
  //   //     .text()
  //   // ).to.be.equal('Xylophone')
  //   // expect(
  //   //   cartProduct
  //   //     .find('h2')
  //   //     .at(1)
  //   //     .text()
  //   // ).to.be.equal('Quantity: 6')
  // })
})

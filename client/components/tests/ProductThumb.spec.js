/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductThumb from '../ProductThumb'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductThumb component', () => {
  let productThumb

  beforeEach(() => {
    const prod = {
      id: 8,
      imgPath: 'xylophone.jpg',
      name: 'Xylophone',
      price: 9999,
      manufacturer: 'testManufacturer'
    }
    productThumb = shallow(<ProductThumb product={prod} />)
  })

  it('renders the correct image', () => {
    expect(productThumb.find('img').prop('src')).to.be.equal('/xylophone.jpg')
  })

  it('renders the correct name, manufacturer and price', () => {
    expect(
      productThumb.find('.productThumbInfo > Link > h3').text()
    ).to.be.equal('Xylophone')
    expect(
      productThumb
        .find('.productThumbInfo > p')
        .at(0)
        .text()
    ).to.be.equal('testManufacturer')
    expect(
      productThumb
        .find('.productThumbInfo > p')
        .at(1)
        .text()
    ).to.be.equal('$99.99')
  })

  it('renders the correct links on name and image', () => {
    expect(productThumb.find('.productThumb > Link').prop('to')).to.be.equal(
      '/products/8'
    )
    expect(
      productThumb.find('.productThumbInfo > Link').prop('to')
    ).to.be.equal('/products/8')
  })
})

/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from '../AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

const getAllProducts = () => {
  return ''
}

describe('AllProducts component', () => {
  let TestAllProducts
  beforeEach(() => {
    const allProducts = [{}, {}, {}]
    TestAllProducts = shallow(
      <AllProducts getAllProducts={getAllProducts} products={allProducts} />
    )
  })

  it('renders the correct number of ProductThumb components', () => {
    expect(TestAllProducts.find('ProductThumb')).to.have.length(3)
  })
})

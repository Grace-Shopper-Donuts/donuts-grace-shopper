/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import OrderHistoryItem from '../OrderHistoryItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('OrderHistoryItem component', () => {
  let orderHistoryItem

  beforeEach(() => {
    const ord = {
      id: 6,
      createdAt: '2020-01-16 11:21:05.296-05',
      orderProducts: [
        {
          checkoutPrice: 10000,
          quantity: 1
        },
        {
          checkoutPrice: 59999,
          quantity: 1
        }
      ]
    }
    orderHistoryItem = shallow(<OrderHistoryItem order={ord} />)
  })

  it('renders the correct name and price', () => {
    expect(
      orderHistoryItem
        .find('h3')
        .at(0)
        .text()
    ).to.be.equal('Order ID: 6')
    expect(
      orderHistoryItem
        .find('h3')
        .at(1)
        .text()
    ).to.be.equal('Total Price: $699.99')
    expect(
      orderHistoryItem
        .find('h3')
        .at(2)
        .text()
    ).to.be.equal('Order Date: 2020-01-16')
  })
})

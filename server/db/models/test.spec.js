const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
const chaiSpies = require('chai-spies')
const sinon = require('sinon')
chai.use(chaiThings)
chai.use(chaiSpies)

//Models
const {User, Product, Order, CartProduct, OrderProduct} = require('./index')

//Routes
const app = require('../../api/index')
const agent = require('supertest')(app)

//Components
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({adapter: new Adapter()})
//import { CheckoutInput } from '../client/components/CheckoutInput'

//Redux

describe('All Tests', () => {
  describe('Backend', () => {
    describe('associations', () => {
      beforeEach(async () => {
        const users = await Promise.all([
          User.create({
            firstName: 'John',
            lastName: 'Cho',
            email: 'cody@email.com',
            password: '123'
          }),
          User.create({
            firstName: 'Ricky',
            lastName: 'Martin',
            email: 'murphy@email.com',
            password: '123'
          })
        ])

        const [john, ricky] = users

        const products = await Promise.all([
          Product.create({
            name: 'Guitar',
            price: 99.99,
            stock: 1
          }),
          Product.create({
            name: 'Piano',
            price: 399.99,
            stock: 5
          })
        ])

        const [guitar, piano] = products

        const orders = await Promise.all([
          Order.create({
            userId: john.id,
            totalPrice: 499.98
          }),
          Order.create({
            userId: ricky.id,
            totalPrice: 499.97
          }),
          Order.create({
            userId: john.id,
            totalPrice: 499.98
          }),
          Order.create({
            userId: ricky.id,
            totalPrice: 499.97
          })
        ])

        const [ord1, ord2, ord3] = orders

        const orderProducts = await Promise.all([
          OrderProduct.create({
            orderId: ord1.id,
            productId: 1,
            quantity: 1,
            status: 'ordered'
          }),
          OrderProduct.create({
            orderId: ord1.id,
            productId: 2,
            quantity: 2,
            status: 'ordered'
          }),
          OrderProduct.create({
            orderId: ord2.id,
            productId: 1,
            quantity: 3,
            status: 'ordered'
          })
        ])

        describe('Orders', () => {
          it('has associated users', async () => {
            const result = await john.hasOrders([ord1, ord3])
            expect(result).to.equal(true)
          })
        })
      })
    })
  })
})

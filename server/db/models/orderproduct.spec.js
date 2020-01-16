/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')

describe('OrderProduct model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validation', () => {
    let user, prod, ord, ordProd

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@email.com',
        password: '123'
      })
      prod = await Product.create({
        name: 'Xylophone',
        price: 99.99,
        stock: 1
      })
      ord = await Order.create({
        userId: user.id
      })
      ordProd = await OrderProduct.create({
        orderId: ord.id,
        productId: prod.id,
        quantity: 1
      })
    })

    it('creates the orderProduct if we supply the required fields', () => {
      expect(typeof ordProd.orderId).to.be.equal('number')
      expect(ordProd.productId).to.be.equal(1)
      expect(ordProd.quantity).to.be.equal(1)
    })
  })
})

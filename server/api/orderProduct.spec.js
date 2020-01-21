/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')

describe('OrderProduct routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orderProduct/', () => {
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

    it('GET /api/orderProduct', async () => {
      const res = await request(app)
        .get('/api/orderProduct')
        .expect(401)

      // TODO: integrate user and admin checks
      // expect(res.body).to.be.an('array')
      // expect(res.body[0].orderId).to.be.equal(1)
      // expect(res.body[0].productId).to.be.equal(1)
      // expect(res.body[0].quantity).to.be.equal(1)
    })
  })
})

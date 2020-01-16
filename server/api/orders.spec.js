/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    let user, user2, ord, ord2

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@email.com',
        password: '123'
      })
      user2 = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@notemail.com',
        password: '123'
      })
      ord = await Order.create({
        userId: user.id
      })
      ord2 = await Order.create({
        userId: user2.id
      })
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].userId).to.be.equal(1)
      expect(res.body[1].userId).to.be.equal(2)
    })

    it('GET /api/orders/:id', async () => {
      const res = await request(app)
        .get('/api/orders/1')
        .expect(200)

      expect(res.body.userId).to.be.equal(1)
    })

    it('GET /api/orders/user/:id', async () => {
      const res = await request(app)
        .get('/api/orders/user/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].userId).to.be.equal(1)
      expect(res.body[1]).to.be.equal(undefined)
    })
  })
})

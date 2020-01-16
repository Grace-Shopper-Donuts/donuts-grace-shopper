/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validation', () => {
    let user, ord

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@email.com',
        password: '123'
      })
      ord = await Order.create({
        userId: user.id
      })
    })

    it('creates the order if we supply the required fields', () => {
      expect(ord.userId).to.be.equal(1)
    })
  })
})

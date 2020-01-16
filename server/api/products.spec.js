/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const prodName = 'Xylophone'

    beforeEach(() => {
      return Product.create({
        name: prodName,
        price: 99.99,
        stock: 1
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(prodName)
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body.name).to.be.equal(prodName)
    })
  })
})

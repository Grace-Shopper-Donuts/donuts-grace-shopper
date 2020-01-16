/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validation', () => {
    // describe('correctPassword', () => {
    let xylo

    beforeEach(async () => {
      xylo = await Product.create({
        name: 'Xylophone',
        price: 99.99,
        stock: 9
      })
    })

    it('creates the product if we supply the required fields', () => {
      expect(xylo.name).to.be.equal('Xylophone')
      expect(xylo.price).to.be.equal('99.99')
      expect(xylo.stock).to.be.equal(9)
      expect(xylo.description).to.be.equal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio. Porttitor lacus luctus accumsan tortor.'
      )
      expect(xylo.imgPath).to.be.equal('default.jpg')
    })

    // it('returns false if the password is incorrect', () => {
    //   expect(cody.correctPassword('bonez')).to.be.equal(false)
    // })
    // }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

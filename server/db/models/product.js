const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Placeholder Make'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio. Porttitor lacus luctus accumsan tortor.'
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default.jpg'
  }
})

Product.beforeValidate(product => {
  product.price = product.price * 100
})

module.exports = Product

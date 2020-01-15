const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
    // use integer type (use)
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio. Porttitor lacus luctus accumsan tortor. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lectus magna fringilla urna porttitor. Tristique nulla aliquet enim tortor at auctor. Magna sit amet purus gravida quis blandit turpis cursus in.'
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default.jpg'
  }
})

module.exports = Product

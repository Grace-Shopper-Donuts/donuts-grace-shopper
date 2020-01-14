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
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio. Porttitor lacus luctus accumsan tortor. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lectus magna fringilla urna porttitor. Tristique nulla aliquet enim tortor at auctor. Magna sit amet purus gravida quis blandit turpis cursus in. Quam pellentesque nec nam aliquam sem et tortor. Placerat duis ultricies lacus sed turpis tincidunt. Mauris ultrices eros in cursus turpis massa tincidunt. Proin libero nunc consequat interdum varius sit. Magna etiam tempor orci eu lobortis. Morbi blandit cursus risus at ultrices mi.'
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default.jpg'
  }
})

module.exports = Product

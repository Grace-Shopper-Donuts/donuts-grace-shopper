const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = define('OrderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderProduct

const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('ordered', 'cart'),
    allowNull: false
  }
  // price at time of checkout
})

module.exports = OrderProduct

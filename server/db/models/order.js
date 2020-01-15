const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: Sequelize.DECIMAL,
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

// function Order.prototype.totalPrice() = {

// }

module.exports = Order

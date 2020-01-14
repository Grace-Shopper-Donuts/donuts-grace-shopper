const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: Sequelize.DECIMAL
})

// function Order.prototype.totalPrice() = {

// }

module.exports = Order

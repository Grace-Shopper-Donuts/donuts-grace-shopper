const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  checkoutPrice: {
    type: Sequelize.INTEGER
  }
  // price at time of checkout
})

OrderProduct.beforeUpdate(entry => {
  if (entry.quantity === 0) {
    entry.destroy()
  }
})

module.exports = OrderProduct

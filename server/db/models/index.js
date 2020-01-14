const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const CartProduct = require('./cartProduct')

Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, {through: OrderProduct})
Order.hasMany(Product)
Product.belongsToMany(User, {through: CartProduct})
User.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Order,
  CartProduct,
  OrderProduct
}

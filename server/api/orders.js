const router = require('express').Router()
const {Order, Product, User, OrderProduct} = require('../db/models')
module.exports = router

// get all orders if administrator

router.get('/', async (req, res, next) => {
  try {
    let user
    if (req.user) user = await User.findByPk(req.user.id)
    if (user && user.isAdmin) {
      const orders = await Order.findAll()
      res.json(orders)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// get specific order if order belongs to user
// eager load the products in that order

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (req.user && req.user.id === order.userId) {
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// get all orders for a user if authorized

router.get('/user/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.id === Number(req.params.userId)) {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId
        },
        include: [
          {
            model: OrderProduct,
            include: [
              {
                model: Product
              }
            ]
          }
        ]
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

// checkout an order - set completed to true

router.put('/checkout', async (req, res, next) => {
  try {
    const {orderId, userId, cartProducts} = req.body

    const order = await Order.findByPk(orderId)

    cartProducts.forEach(async orderProduct => {
      const product = orderProduct.product
      await OrderProduct.update(
        {
          checkoutPrice: product.price
        },
        {
          where: {
            orderId: orderId,
            productId: orderProduct.productId
          }
        }
      )
    })

    await order.update({
      completed: true
    })

    await Order.create({
      userId: userId,
      completed: false
    })

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

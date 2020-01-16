const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //we have to check if the user is admin after we put the isAdmin property on the model
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

router.get('/user/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.id === Number(req.params.userId)) {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId
        }
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId)
    await order.update({
      completed: true
    })
    await Order.create({
      userId: req.body.userId,
      completed: false
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

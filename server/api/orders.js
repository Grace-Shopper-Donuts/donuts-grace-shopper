const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
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
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

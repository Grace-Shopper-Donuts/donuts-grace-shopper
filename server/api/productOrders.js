const router = require('express').Router()
const {Order, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const productOrders = await ProductOrder.findAll()
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const productOrder = await ProductOrder.findById(req.params.id, {
      include: [{model: Order}]
    })
    res.json(productOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/order/:orderId', async (req, res, next) => {
  try {
    const productOrders = await Order.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

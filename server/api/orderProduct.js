const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orderProducts = await OrderProduct.findAll()
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findByPk(req.params.id, {
      include: [{model: Order}]
    })
    res.json(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/order/:orderId', async (req, res, next) => {
  try {
    const orderProducts = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// security

router.get('/', async (req, res, next) => {
  try {
    const orderProducts = await OrderProduct.findAll()
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const id = req.user.id
    let currentOrder = await Order.findAll({
      where: {
        userId: id,
        completed: false
      }
    })
    currentOrder = currentOrder[0]
    const cartProducts = await OrderProduct.findAll({
      where: {
        orderId: currentOrder.id
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.send(cartProducts)
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

router.post('/cart', async (req, res, next) => {
  try {
    var existingOrder = await Order.findAll({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    if (existingOrder) {
      existingOrder = existingOrder[0]
    }
    console.log(existingOrder)
    if (!existingOrder) {
      existingOrder = await Order.create({
        userId: req.user.id,
        completed: false
      })
    }
    console.log(existingOrder)
    console.log(req.body)
    try {
      var existingOrderProduct = await OrderProduct.findAll({
        where: {
          orderId: existingOrder.id,
          productId: req.body.productId
        }
      })
      if (existingOrderProduct) {
        existingOrderProduct = existingOrderProduct[0]
      }
    } catch (err) {
      next(err)
    }
    if (existingOrderProduct) {
      existingOrderProduct.quantity = existingOrderProduct.quantity + 1
    } else {
      await OrderProduct.create({
        userId: req.user.id,
        orderId: existingOrder.dataValues.id,
        quantity: 1,
        productId: req.body.productId,
        completed: false
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const cartProducts = await OrderProduct.findAll({
      where: {
        userId: req.user,
        completed: false
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.send(cartProducts)
  } catch (err) {
    next(err)
  }
})

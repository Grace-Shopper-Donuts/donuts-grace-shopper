const router = require('express').Router()
const {CartProduct, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cartProducts = await CartProduct.findAll()
    res.json(cartProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await CartProduct.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

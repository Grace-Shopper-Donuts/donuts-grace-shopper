const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// privacy/security

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'address']
      })
      res.json(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.id === Number(req.params.id) || req.user.isAdmin)
    ) {
      const user = await User.findByPk(req.params.id)
      res.json(user)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.id === Number(req.params.id) || req.user.isAdmin)
    ) {
      const userInfo = req.body
      const [numRows, affectedRows] = await User.update(userInfo, {
        where: {
          id: req.user.id
        },
        returning: true,
        plain: true
      })
      res.status(200).json(affectedRows)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

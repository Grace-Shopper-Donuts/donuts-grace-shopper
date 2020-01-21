const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// privacy/security

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userInfo = req.body
    console.log('USERINFO', userInfo)
    const [numRows, affectedRows] = await User.update(userInfo, {
      where: {
        id: req.user.id
      },
      returning: true,
      plain: true
    })
    console.log(numRows, affectedRows)
    res.status(200).json(affectedRows)
  } catch (error) {
    next(error)
  }
})

'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {OrderProduct} = require('../server/db/models')
const {CartProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'John',
      lastName: 'Cho',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Ricky',
      lastName: 'Martin',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Guitar',
      cost: 99.99
    }),
    Product.create({
      name: 'Piano',
      cost: 399.99
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      totalPrice: 499.98
    }),
    Order.create({
      userId: 2,
      totalPrice: 499.97
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      orderId: 1,
      productId: 1,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 2,
      quantity: 2
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 1,
      quantity: 3
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 2,
      quantity: 4
    })
  ])

  const cartProducts = await Promise.all([
    CartProduct.create({
      userId: 1,
      productId: 1,
      quantity: 1
    }),
    CartProduct.create({
      userId: 1,
      productId: 2,
      quantity: 2
    }),
    CartProduct.create({
      userId: 2,
      productId: 1,
      quantity: 3
    }),
    CartProduct.create({
      userId: 2,
      productId: 2,
      quantity: 4
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${orderProducts.length} orderProducts`)
  // console.log(`seeded ${cartProducts.length} cartProducts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {OrderProduct} = require('../server/db/models')

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

  const [john, ricky] = users

  const products = await Promise.all([
    Product.create({
      name: 'Guitar',
      price: 99.99,
      stock: 1
    }),
    Product.create({
      name: 'Piano',
      price: 399.99,
      stock: 5
    })
  ])

  const [guitar, piano] = products

  const orders = await Promise.all([
    Order.create({
      userId: john.id,
      totalPrice: 499.98
    }),
    Order.create({
      userId: ricky.id,
      totalPrice: 499.97
    }),
    Order.create({
      userId: john.id,
      totalPrice: 499.98
    }),
    Order.create({
      userId: ricky.id,
      totalPrice: 499.97
    })
  ])

  const [ord1, ord2, ord3, ord4] = orders

  const orderProducts = await Promise.all([
    OrderProduct.create({
      orderId: ord1.id,
      productId: 1,
      quantity: 1,
      status: 'ordered'
    }),
    OrderProduct.create({
      orderId: ord1.id,
      productId: 2,
      quantity: 2,
      status: 'ordered'
    }),
    OrderProduct.create({
      orderId: ord2.id,
      productId: 1,
      quantity: 3,
      status: 'ordered'
    }),
    OrderProduct.create({
      orderId: ord2.id,
      productId: 2,
      quantity: 4,
      status: 'ordered'
    }),
    OrderProduct.create({
      orderId: ord3.id,
      productId: 1,
      quantity: 1,
      status: 'cart'
    }),
    OrderProduct.create({
      orderId: ord3.id,
      productId: 2,
      quantity: 2,
      status: 'cart'
    }),
    OrderProduct.create({
      orderId: ord4.id,
      productId: 1,
      quantity: 3,
      status: 'cart'
    }),
    OrderProduct.create({
      orderId: ord4.id,
      productId: 2,
      quantity: 4,
      status: 'cart'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderProducts.length} orderProducts`)
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

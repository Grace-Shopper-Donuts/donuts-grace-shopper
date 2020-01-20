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
      stock: 1,
      imgPath: 'images/productImages/electricGuitar.jpg'
    }),
    Product.create({
      name: 'Piano',
      price: 399.99,
      stock: 5,
      imgPath: 'images/productImages/piano.jpg'
    }),
    Product.create({
      name: 'Drums',
      price: 349.99,
      stock: 3,
      imgPath: 'images/productImages/drums.jpg'
    }),
    Product.create({
      name: 'Tuba',
      price: 299.99,
      stock: 7,
      imgPath: 'images/productImages/tuba.jpg'
    }),
    Product.create({
      name: 'Violin',
      price: 99.99,
      stock: 6,
      imgPath: 'images/productImages/violin.jpg'
    }),
    Product.create({
      name: 'Saxophone',
      price: 249.99,
      stock: 2,
      imgPath: 'images/productImages/saxophone.jpg'
    }),
    Product.create({
      name: 'Trumpet',
      price: 199.99,
      stock: 12,
      imgPath: 'images/productImages/trumpet.jpg'
    }),
    Product.create({
      name: 'Clarinet',
      price: 249.99,
      stock: 27,
      imgPath: 'images/productImages/clarinet.jpg'
    })
  ])

  const [guitar, piano] = products

  const orders = await Promise.all([
    Order.create({
      userId: john.id,
      completed: true
    }),
    Order.create({
      userId: ricky.id,
      completed: true
    }),
    Order.create({
      userId: john.id,
      completed: true
    }),
    Order.create({
      userId: john.id,
      completed: false
    }),
    Order.create({
      userId: ricky.id,
      completed: false
    })
  ])

  const [ord1, ord2, ord3, ord4] = orders

  const orderProducts = await Promise.all([
    OrderProduct.create({
      orderId: ord1.id,
      productId: 1,
      quantity: 1,
      checkoutPrice: 9999
    }),
    OrderProduct.create({
      orderId: ord1.id,
      productId: 2,
      quantity: 2,
      checkoutPrice: 39999
    }),
    OrderProduct.create({
      orderId: ord2.id,
      productId: 1,
      quantity: 3,
      checkoutPrice: 9999
    }),
    OrderProduct.create({
      orderId: ord2.id,
      productId: 2,
      quantity: 4,
      checkoutPrice: 39999
    }),
    OrderProduct.create({
      orderId: ord3.id,
      productId: 3,
      quantity: 4,
      checkoutPrice: 34999
    }),
    OrderProduct.create({
      orderId: ord3.id,
      productId: 4,
      quantity: 2,
      checkoutPrice: 29999
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

const stripe = require('stripe')('sk_test_0LQEKAOV7pxoJvU4OLihYMHp00qH9Z6B97')

const makeStripeCharge = async (totalPrice, email) => {
  const charge = await stripe.charges.create({
    amount: totalPrice,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: email
  })
  return charge
}

module.exports = makeStripeCharge

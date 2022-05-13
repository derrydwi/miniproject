const express = require('express')
const app = express()
const payment = require('./routes/payment')
const shipping = require('./routes/shipping')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(payment)
app.use(shipping)

export default {
  path: '/api',
  handler: app,
}

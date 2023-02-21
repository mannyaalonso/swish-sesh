const express = require('express')
require("dotenv").config()
const db = require('./db')
const routes = require("./routes")
const logger = require('morgan')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51Mdc0NHJzJjGpnF26kIgoFfsZZEuE7Hq5u1UThKfn0ySXfk86XS9gZu5Q4fTC9Sdkvvp34LoSSACFvJY4rgSEw0L00C9GTdggg');

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

app.use("/api", routes);

app.use(express.static(`${__dirname}/client/build`))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1MdivGHJzJjGpnF2Wt5Xh4sa',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
})

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`))
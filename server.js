require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const routes = require('./routes')
const db = require('./db')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

app.use('/api', routes);

app.use(express.static(`${__dirname}/client/build`))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `?success=true`,
      cancel_url: `?canceled=true`,
    });
  
    res.redirect(303, session.url);
  });

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`))
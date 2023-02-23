const express = require("express")
const Stripe = require("stripe")
//const { Order } = require("../models/Order")

require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)
const router = express.Router()
const YOUR_DOMAIN = "http://localhost:3000"

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1MdivGHJzJjGpnF2Wt5Xh4sa",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })
  res.redirect(303, session.url)
})

// Create order function

const createOrder = async (customer, data) => {
  console.log(customer, data)
  // const Items = JSON.parse(customer.metadata.cart)

  // const products = Items.map((item) => {
  //   return {
  //     productId: item.id,
  //     quantity: item.cartQuantity,
  //   }
  // })

  // const newOrder = new Order({
  //   userId: customer.metadata.userId,
  //   customerId: data.customer,
  //   paymentIntentId: data.payment_intent,
  //   products,
  //   subtotal: data.amount_subtotal,
  //   total: data.amount_total,
  //   shipping: data.customer_details,
  //   payment_status: data.payment_status,
  // })

  // try {
  //   const savedOrder = await newOrder.save()
  //   console.log("Processed Order:", savedOrder)
  // } catch (err) {
  //   console.log(err)
  // }
}

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data
    let eventType

    // Check if webhook signing is configured.
    let webhookSecret
    webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event
      let signature = req.headers["stripe-signature"]

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        )
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`)
        return res.sendStatus(400)
      }
      // Extract the object from the event.
      data = event.data.object
      eventType = event.type
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object
      eventType = req.body.type
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            createOrder(customer, data)
          } catch (err) {
            console.log(typeof createOrder)
            console.log(err)
          }
        })
        .catch((err) => console.log(err.message))
    }

    res.status(200).end()
  }
)

module.exports = router

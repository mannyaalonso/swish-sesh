const { json } = require("express")
const express = require("express")
const Stripe = require("stripe")
const { Run, User } = require("../models")

require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)
const router = express.Router()

router.post("/create-checkout-session", async (req, res) => {
	const { userId, runId } = req.body

	const customer = await stripe.customers.create({
		metadata: {
			userId: userId,
			runId: runId,
		},
	})

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price: "price_1MerW5Ecp2ml8xSx6FTNEwqx",
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.DOMAIN_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.DOMAIN_URL}?canceled=true`,
		customer: customer.id,
	})
	res.redirect(303, session.url)
})

// Create order function

const fullfillOrder = async (customerId, runId) => {
	//use body that gets sent to webhook to push players into specific run
	await Run.findByIdAndUpdate(
		runId,
		{ $push: { players: customerId } },
		{ new: true }
	)

	await User.findByIdAndUpdate(
		customerId,
		{ $push: { pastRuns: runId } },
		{ new: true }
	)
}

// Stripe webhoook
router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	async (req, res) => {
		console.log(req.body)
		let data
		let eventType

		let webhookSecret
		webhookSecret = process.env.STRIPE_WEB_HOOK

		if (webhookSecret) {
			let event
			let signature = req.headers["stripe-signature"]

			try {
				event = stripe.webhooks.constructEvent(
					req.rawBody,
					signature,
					webhookSecret
				)
				console.log(event)
			} catch (err) {
				console.log(
					`⚠️  Webhook signature verification failed:  ${err}`
				)
				return res.sendStatus(400)
			}
			data = event.data.object
			eventType = event.type
		} else {
			data = req.body.data.object
			eventType = req.body.type
		}
		if (eventType === "checkout.session.completed") {
			stripe.customers.retrieve(data.customer).then(async (customer) => {
				console.log(customer)
				try {
					fullfillOrder(
						customer.metadata.userId,
						customer.metadata.runId
					)
				} catch (err) {
					console.log(typeof createOrder)
					console.log(err)
				}
			})
		}
		res.status(200).send().end()
	}
)

module.exports = router

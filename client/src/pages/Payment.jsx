import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"

export const Payment = () => {
	const [stripePromise, setStripePromise] = useState(null)
	const [clientSecret, setClientSecret] = useState("")

	useEffect(() => {
		fetch("/config").then(async (r) => {
			const { publishableKey } = await r.json()

			console.log(publishableKey)
			setStripePromise(loadStripe(publishableKey))
		})
	}, [])

	useEffect(() => {
		fetch("/create-payment-intent", {
			method: "POST",
			body: JSON.stringify({}),
		}).then(async (r) => {
			const { clientSecret } = await r.json()

			console.log(clientSecret)
			setClientSecret(clientSecret)
		})
	}, [])

	return (
		<>
			<div>Payment</div>
			{stripePromise && clientSecret && (
				<Elements
					stripe={stripePromise}
					options={{ clientSecret }}
				>
					<CheckoutForm />
				</Elements>
			)}
		</>
	)
}

export default Payment

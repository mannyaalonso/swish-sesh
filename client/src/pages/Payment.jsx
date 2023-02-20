import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

export const Payment = () => {
	const [stripePromise, setStripePromise] = useState(null)

	useEffect(() => {
		fetch("http://localhost:3001/config").then(async (r) => {
			const { publishableKey } = await r.json()

			console.log(publishableKey)
			setStripePromise(loadStripe(publishableKey))
		})
	}, [])

	return <div>Payment</div>
}

export default Payment

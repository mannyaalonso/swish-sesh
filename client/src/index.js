import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import React from "react"
import App from "./App"
import "./index.css"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </React.StrictMode>
)

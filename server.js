const express = require("express")
const db = require("./db")
const routes = require("./routes")
const logger = require("morgan")
const cors = require("cors")
const stripe = require("./routes/stripe")
const PORT = process.env.PORT || 3001
const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger("dev"))
app.use("/api", routes)
app.use("/api/stripe", stripe)
app.use(express.static(`${__dirname}/client/build`))

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

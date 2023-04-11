const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        picture: { type: String, required: true },
        experience: { type: String, },
        pastRuns: { type: [Schema.Types.ObjectId], ref: 'Runs' },
        hasPayment: { type: Boolean, required: true },
        stripeId: { type: String },
    },
    { timestamps: true },
)

module.exports = userSchema
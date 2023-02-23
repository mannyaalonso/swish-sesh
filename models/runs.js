const { Schema } = require('mongoose')

const runsSchema = new Schema(
    {
        date: { type: String, required: true },
        time: { type: String, required: true },
        host: { type: String, required: true },
        players: { type: [Schema.Types.ObjectId], ref: 'User'},
        location: { type: String, required: true },
        address: {type: String, required: true},
        isFull: { type: Boolean, required: true }
    },
    { timestamps: true }
)

module.exports = runsSchema
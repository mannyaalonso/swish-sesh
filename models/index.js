const mongoose = require('mongoose')
const runsSchema = require('./runs')
const userSchema = require('./user')

const Runs = mongoose.model('Runs', runsSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Runs,
    User
}
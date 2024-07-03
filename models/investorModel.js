const Mongoose = require("mongoose")

const investorSchema = new Mongoose.Schema({
    investor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    equity: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})
module.exports = Mongoose.model('Investors', investorSchema)
const Mongoose = require("mongoose")
const Investors = require('./investorModel')

const entreprenureSchema = new Mongoose.Schema({
    entrepreneur: {
        type: String,
        required: true
    },
    pitchTitle: {
        type: String,
        required: true
    },
    pitchIdea: {
        type: String,
        required: true
    },
    askAmount: {
        type: Number,
        required: true
    },
    equity: {
        type: Number,
        required: true
    },
    offers: []
}
)
module.exports = Mongoose.model('Entrepreneurs', entreprenureSchema)
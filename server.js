const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/xharkTank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})

const db = mongoose.connection

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to database "))

app.use(express.json())

const pitches = require('./routes/pitches')
app.use('/pitches', pitches)
app.listen(3000, () => console.log("server started"))
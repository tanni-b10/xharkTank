const express = require('express')
const router = express.Router()
const Entrepreneurs = require('../models/entreprenureModel')
const Investors = require('../models/investorModel')
const entreprenureModel = require('../models/entreprenureModel')
//getting all
router.get('/', async (req, res) => {
    try {
        const entreprenures = await Entrepreneurs.find()
        console.log('List of Pitches');
        res.status(200).json(entreprenures.reverse())
    }
    catch (err) {
        res.send(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id', getEntreprenur, (req, res) => {
    console.log('A single pitch');
    res.status(200).send(res.entreprenur)
})

//creating one
router.post('/', async (req, res) => {
    const entrepreneur = new Entrepreneurs({
        entrepreneur: req.body.entrepreneur,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        askAmount: req.body.askAmount,
        equity: req.body.equity
    })
    try {
        const newEntreprenur = await entrepreneur.save()
        console.log('Pitch created successfully');
        res.status(201).json({ id: newEntreprenur.id })
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid Request Body' })
    }
})

router.post('/:id/makeOffer', async (req, res) => {
    const investor = new Investors({
        investor: req.body.investor,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment
    })
    let pitch
    try {
        pitch = await Entrepreneurs.findById(req.params.id)
        if (pitch == null) {
            return res.status(404).json({ message: 'Pitch Not Found' })
        }
        await investor.save()
        pitch.offers.push(investor)
        await pitch.save()
        console.log('Offer created successflly');
        res.status(201).json({ id: pitch.id })
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid Request Body' })
    }
})

//middleware
async function getEntreprenur(req, res, next) {
    let entreprenur
    try {
        entreprenur = await Entrepreneurs.findById(req.params.id)
        if (entreprenur == null) {
            return res.status(404).json({ message: 'Pitch Not Found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.entreprenur = entreprenur
    next()
}

module.exports = router
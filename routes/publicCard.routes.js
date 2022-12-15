// Requires

const { Router } = require('express');
const Card = require('../models/Card.model.js');
const Deck = require('../models/Deck.model.js');
const mtg = require('mtgsdk');

//Environment
const router = Router();
require("dotenv").config();


// Routes

router.get('/publicSearchCard', async (req, res, next) => {
    const { name } = req.body;

    try {
        const result = await mtg.card.where({ name })
        res.status(201).json(result[0]);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
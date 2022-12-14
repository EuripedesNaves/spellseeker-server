// Requires

const { Router } = require('express');
const Deck = require('../models/Deck.model.js');

//Environment
const router = Router();
require("dotenv").config();


// Routes
router.post('/createDeck', async (req, res, next) => {

})

module.exports = router;
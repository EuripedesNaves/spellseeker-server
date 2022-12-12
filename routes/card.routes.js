// Requires

const { Router } = require('express');
const Card = require('../models/Card.model.js');
const mtg = require('mtgsdk');

//Environment
const router = Router();
require("dotenv").config();


// Routes

router.get('/searchCard', async (req, res, next) => {
    const {name} = req.body;

    try {
            mtg.card.where({name})
            .then(results => {
                res.status(201).json({ results });
            })

    } catch (error) {

        next(error)
    }
})



module.exports = router;
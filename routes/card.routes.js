// Requires

const { Router } = require('express');
const Card = require('../models/Card.model.js');
const Deck = require('../models/Deck.model.js');
const User = require('../models/User.model.js');
const mtg = require('mtgsdk');

//Environment
const router = Router();
require("dotenv").config();


// Routes

router.get('/searchCard', async (req, res, next) => {
    const { name } = req.body;

    try {
        const result = await mtg.card.where({ name })
        res.status(201).json(result[0]);
    } catch (error) {
        next(error)
    }
})

router.post('/createCard/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    try {

        //Checando deck
        const deck = await Deck.findById(deckId);

        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }

        //Checando se o usuário é dono desse deck
        let { id } = req.user;
        console.log(id, (deck.idUserInDeck).toString())

        if (id !== (deck.idUserInDeck).toString()) {
            return res.status(404).json({ message: 'Its not your deck' })
        }

        //Salvando a carta
        const { cardName } = req.body;

        const [result] = await mtg.card.where({ name: cardName })

        const { name, manaCost, cmc, colors, types, text, imageUrl } = result

        const newCard = await Card.create({ name, manaCost, cmc, colors, types, text, imageUrl, deckId })
        res.status(201).json(newCard);


    } catch (error) {

        next(error)
    }
})



module.exports = router;
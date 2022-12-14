// Requires

const { Router } = require('express');
const Card = require('../models/Card.model.js');
const Deck = require('../models/Deck.model.js');
const mtg = require('mtgsdk');

//Environment
const router = Router();
require("dotenv").config();


// Routes

router.get('/searchCard', async (req, res, next) => {
    const { name } = req.body;

    try {
        const result = await mtg.card.where({ name })
        console.log(result[0])
        res.status(201).json(result[0]);
    } catch (error) {
        next(error)
    }
})

router.post('/createCard/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    try {
        
        //Checando deck
        
        // Pegar ID do deck - findById
        const deck = await Deck.findById(deckId);
        console.log('resultado do deck:', deck)
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }

        //Salvando a carta

        const { cardName } = req.body;

        const [ result ] = await mtg.card.where({ name: cardName })
        console.log('resultado da pesquisa de carta:', result)
        
        const { name, manaCost, cmc, colors, types, text, imageUrl, id } = result

        // Verificar se já há cards salvos

        const newCard = await Card.create({name, manaCost, cmc, colors, types, text, imageUrl, externalId: id, deckId})
        res.status(201).json(newCard);


    } catch (error) {
        next(error)
    }
})

router.delete('/deleteCard/:deckId', async (req, res, next) => {


})

module.exports = router;
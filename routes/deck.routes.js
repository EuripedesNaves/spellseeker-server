// Requires

const { Router } = require('express');
const { findById } = require('../models/Card.model.js');
const Card = require('../models/Card.model.js');
const Deck = require('../models/Deck.model.js');
const User = require('../models/User.model.js');

//Environment
const router = Router();
require("dotenv").config();


// Routes
router.post('/createDeck', async (req, res, next) => {
    const { deckName, color } = req.body;
    const { id } = req.user;

    try {
        const newDeck = await Deck.create({deckName, color, idUserInDeck: id})
        res.status(201).json(newDeck);


    } catch (error) {
        next(error)
    }

})

router.delete('/deleteCard/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    try {
        
        //Checando deck
        const deck = await Deck.findById(deckId);
        console.log('resultado do deck:', deck)
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }

        //Deletando uma carta

       

        


    } catch (error) {
        next(error)
    }

})

router.get('/allCardsInDeck/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    try {
        //Checando deck
        const deck = await Deck.findById(deckId);
        console.log('resultado do deck:', deck)
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }

        //READ - Retornar todas as cartas
        const cards = await Card.find()
        res.status(201).json(cards)

    } catch (error) {
        next(error)
    }

})

router.get('/cardInDeck/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    try {
        //Checando deck
        const deck = await Deck.findById(deckId);
        console.log('resultado do deck:', deck)
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }

        //READ - Retornar carta específica
        const { cardName } = req.body;

        const searchCardInDeck = await Card.findOne({cardName})
        res.status(201).json(searchCardInDeck)

    } catch (error) {
        next(error)
    }

})

router.put('/updateDeck/:deckId', async (req, res, next) => {
    const { deckId } = req.params;
    const { id } = req.user;
    const update  = req.body;
    console.log(update);
    
    try {
        
        //Checando deck
        const deck = await Deck.findById(deckId);
        console.log('resultado do deck:', deck)
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' })
        }
        
        
        //Checando se o usuário é dono desse deck
        if(id !== (deck.idUserInDeck).toString()){
            return res.status(404).json({message: 'Its not your deck'})
        }
        const updatedDeck = await Deck.findByIdAndUpdate(deckId, update, {new: true})
        res.status(201).json(updatedDeck)
        
    } catch (error) {
        next(error)
    }

})

// Get de Decks ----> Criar

module.exports = router;
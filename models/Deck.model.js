import {Schema, model} from 'mongoose'

const deckSchema = new Schema({


}, {timestemp: true})

const Deck = model('Deck', deckSchema);

export default Deck;

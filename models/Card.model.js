import {Schema, model} from 'mongoose'

const cardSchema = new Schema({


}, {timestemp: true})

const Card = model('Card', cardSchema);

export default Card;

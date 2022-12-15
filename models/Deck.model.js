const { Schema, model } = require('mongoose');


const deckSchema = new Schema({
    deckName:{
        type: String,
        required: [true, 'card name is required']
    },
    color:{
        type: [ String ],
    },
    idUserInDeck: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestemp: true})


module.exports = model('Deck', deckSchema);

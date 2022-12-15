const { Schema, model } = require('mongoose');


const cardSchema = new Schema({

    name:{
        type: String,
        required: [true, 'card name is required']
    },
    manaCost:{
        type: String,
    },
    cmc:{
        type: Number,
    },
    color:{
        type: String,
    },
    types:{
        type: [ String ],
    },
    text:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    deckId:{
        type: Schema.Types.ObjectId,
        ref: "Deck"
    }
   
    //Quantidade de cartas


}, {timestamps: true})


module.exports = model('Card', cardSchema);
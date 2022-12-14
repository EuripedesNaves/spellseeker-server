const { Schema, model } = require('mongoose');


const deckSchema = new Schema({
    name:{
        type: String,
        required: [true, 'card name is required']
    },
 /*   manaCost:{
        type: String,
    },
    color:{
        type: String,
    },
    types:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    id:{
        type: String,
    },
    idSpellseeker:{
        type: String,
    },
    commander:{
        type: String,
    }  
*/

}, {timestemp: true})


module.exports = model('Deck', deckSchema);

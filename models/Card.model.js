import {Schema, model} from 'mongoose'

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
        type: String,
    },
    subTypes:{
        type: [ String ],
    },
    rarity:{
        type: String,
    },
    set:{
        type: String,
    },
    setName:{
        type: String,
    },
    text:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    legalities:{
        type: [ String ],
    },
    id:{
        type: String,
    },
    idSpellseeker:{
        type: String,
    },
    commander:{
        type: Boolean,
    }

}, {timestamps: true})

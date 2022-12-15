const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    idDecksInUser: [{
      type: Schema.Types.ObjectId,
      ref:"Deck"
    }]
    
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
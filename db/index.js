const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI

const connect = async () => {
    try {
        const x = await mongoose.connect(DB_URI)
        console.log(`Connect to Mongo! DataBase: ${x.connections[0].name}`)
    }catch (error) {
        console.log(error)
    }
}

connect()

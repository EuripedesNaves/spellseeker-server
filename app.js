import express from 'express'
const PORT = 5000

import './db/index.js'

const app = express();

app.get('/', (request, response) => {
    response.send('Server Online')
})


app.listen(PORT, () => {
    console.log(`Server Runing`)
})
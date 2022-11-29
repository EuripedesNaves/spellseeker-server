
const express = require('express');
const PORT = 5005

require('./db/index.js')

const authRoute = require('./auth.routes.js');

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    response.send('Server Online')
})

//Crud SpellSeeker

// CREATE
app.post('/card', (req, res) => {
    res.send('Criando Cards')
})


app.use('/', authRoute);

app.listen(PORT, () => {
    console.log(`Server Runing`)
})

//Environment 
require("dotenv").config();



const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/auth.routes.js');

const app = express();

//Conectado BD
require('./db/index.js');

// Conexões de outras origens

// usando lib e liberando para qualquer dominio
app.use(cors())

//Em desenvolvimento show app logs
app.use(logger('dev'))



//Body das Requisições
app.use(express.json())


//Crud SpellSeeker
app.get('/', (request, response) => {
    response.send('Server Online')
})

// CREATE
app.post('/card', (req, res) => {
    res.send('Criando Cards')
})

//Rotas Públicas
app.use('/', authRoute);

//Middleware
app.use(require('./middlewares/auth.middleware.js'));

//Rotas Particulares



//listen
app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`)
  })

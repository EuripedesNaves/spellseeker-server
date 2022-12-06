//Environment 
require("dotenv").config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/auth.routes.js');
const card = require('./routes/card.routes.js');

const app = express();

//Conectado BD
require('./db/index.js');


// Conexões de outras origens
app.use(cors())


//Em desenvolvimento show app logs
app.use(logger('dev'))


//Body das Requisições
app.use(express.json())


//Rotas Públicas
app.use('/', authRoute);
app.use('/', card);

//Middleware
app.use(require('./middlewares/auth.middleware.js'));

//Rotas Particulares

//Configuração de erro
require('./error-handling')(app)

//listen
app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`)
  })

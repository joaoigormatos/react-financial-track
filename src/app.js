const express = require('express')
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const cors = require('cors');



/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();


const app = express()
app.use(cors());
app.use(express.json());
app.use(routes)

module.exports = app
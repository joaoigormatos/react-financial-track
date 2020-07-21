const express = require('express');
const router = express.Router();
const transaction = require('./transaction')
const path = require('path');


/**
 * Vinculando o React ao app
 */
router.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
router.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});


router.use('/api/transaction/', transaction);




module.exports = router;

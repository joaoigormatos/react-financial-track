const express = require('express')
const transactionService = require('../services/transactionService')
const transactionRouter = express.Router();

transactionRouter.post('/', transactionService.create)
transactionRouter.put('/:id', transactionService.update)
transactionRouter.get('/', transactionService.index)
transactionRouter.delete('/:id', transactionService.remove)

module.exports = transactionRouter


const express = require('express');
const transactionRouter = express.Router();

const TransactionService = require('../services/transactionService.js');

transactionRouter.post('/', TransactionService.create);
transactionRouter.get('/', TransactionService.findAll);
transactionRouter.get('/:id', TransactionService.findOne);
transactionRouter.put('/:id', TransactionService.update);
transactionRouter.delete('/:id', TransactionService.remove);
transactionRouter.delete('/', TransactionService.removeAll);
transactionRouter.get('/period/:pd', TransactionService.findDate);

module.exports = transactionRouter;

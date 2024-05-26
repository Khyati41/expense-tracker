import {Router} from 'express';
import {createTransactions, getAllTransactions, getTransaction, deleteTransaction} from './transactions.controller.js';

const transactionsRoute: Router = Router();

transactionsRoute.get('/', getAllTransactions);
transactionsRoute.get('/:id', getTransaction);
transactionsRoute.post('/', createTransactions);
transactionsRoute.delete('/:id', deleteTransaction);

export default transactionsRoute;
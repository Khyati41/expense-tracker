import {Response, Request} from 'express';
import TransactionsModel from './transactions.model.js';
import {ITransaction} from './transactions.interface.js';

export const createTransactions = async (request: Request, response: Response) => {
    const transactionObj = request.body;
    if (!transactionObj.name) {
        return response.status(400).json({message: 'Transaction name is required'});
    }
    if (!transactionObj.category) {
        return response.status(400).json({message: 'Transaction category is required'});
    }
    if (!transactionObj.amount) {
        return response.status(400).json({message: 'Transaction amount is required'});
    }

    request.body.amount = Number(request.body.amount);

    try {
        const transaction: ITransaction = await TransactionsModel.create(request.body);
        const transactionWithPopulate = await TransactionsModel.findOne({_id: transaction._id}).populate('category').exec();
        ;
        response.status(200).send(transactionWithPopulate);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const getAllTransactions = async (request: Request, response: Response) => {
    try {
        const transactions: Array<ITransaction | null> = await TransactionsModel.find({}).populate('category').lean().exec();
        response.status(200).send(transactions);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const getTransaction = async (request: Request, response: Response) => {
    const transactionId: string = request.params && request.params.id;

    if (!transactionId) {
        return response.status(400).json({message: 'Transaction id is required'});
    }
    
    try {
        const transaction: ITransaction | null = await TransactionsModel.findById(transactionId).populate('category').exec();
        response.status(200).send(transaction);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const deleteTransaction = async (request: Request, response: Response) => {
    const transactionId: string = request.params.id;

    if (!transactionId) {
        return response.status(400).json({message: 'Transaction id is required'});
    }

    try {
        const transaction: ITransaction | null = await TransactionsModel.findByIdAndDelete({_id: transactionId}).exec();
        response.status(200).send(transaction);
    } catch (error) {        
        response.status(500).send(error);
    }
}
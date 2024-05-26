import { Schema, model, Model } from 'mongoose';
import { ITransaction } from './transactions.interface.js';

const transactionsSchema = new Schema({
    name: {type: String},
    amount: {type: Number},
    category: {ref: 'categories', type: Schema.Types.ObjectId}
}, {timestamps: true})

const Transactions = model<ITransaction>('transactions', transactionsSchema);

export default Transactions;
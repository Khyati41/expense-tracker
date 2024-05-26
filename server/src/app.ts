import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express';
import cors from 'cors';
import transactionsRoute from './api/transactions/transactions.route.js';
import categoriesRoute from './api/categories/categories.route.js';
import {connect} from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL || '';

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/transactions', transactionsRoute);
app.use('/api/categories', categoriesRoute);

connect(MONGODB_URL)
    .then(db => {
        console.log('Database connected')
        app.listen(process.env.PORT, ()=> {
            console.log('Server started');
        })

        app.on('error', err => console.log('Http server error', err))
    })
    .catch(e => {
        console.error(e)
        process.exit(1)})
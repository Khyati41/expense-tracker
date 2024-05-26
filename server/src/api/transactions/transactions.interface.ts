import {ICategory} from '../categories/categories.interface.js';
import {Types } from 'mongoose';

export interface ITransaction{
    _id?: Types.ObjectId; 
    name: string;
    amount: number;
    category: string | ICategory;
    createdAt?: string;
    updatedAt?: string;
}
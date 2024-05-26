import {Types} from 'mongoose';

export interface ICategory {
    _id?: Types.ObjectId;
    type: string;
    color: string;
    createdAt?: string;
    updatedAt?: string;
}
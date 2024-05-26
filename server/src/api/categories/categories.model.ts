import { Model, Schema, model } from 'mongoose';
import { ICategory } from './categories.interface.js';

enum CATEGORIES {
    INVESTMENT = 'Investment',
    EXPENSE = 'Expense',
    SALARY = 'Salary'
}

const categoriesSchema = new Schema({
    type: {type: String, default: CATEGORIES.INVESTMENT},
    color: {type: String}
}, {timestamps: true})

const Categories = model<ICategory>('categories', categoriesSchema);

export default Categories;

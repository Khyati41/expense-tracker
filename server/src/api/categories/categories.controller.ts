import {Response, Request} from 'express';
import CategoriesModel from './categories.model.js';
import { ICategory } from './categories.interface.js';

export const createCategories = async (request: Request, response: Response) => {
    const categoryObj = request.body;

    if (!categoryObj.type) {
        return response.status(400).json({message: 'Category type is required'});
    }
    if (!categoryObj.color) {
        return response.status(400).json({message: 'Category color is required'});
    }

    try {
        await CategoriesModel.create(request.body);
        response.status(200).json({message: 'Category created successfully'});
    } catch (error) {
        response.status(500).send(error);
    }
    
}

export const getAllCategories = async (request: Request, response: Response) => {
    try {
        const categories: Array<ICategory> = await CategoriesModel.find({}, 'color type').exec();
        response.status(200).send(categories);
    } catch (error) {
        response.status(500).send(error);
    }

}

export const getCategory = async (request: Request, response: Response) => {
    const categoryId: string = request.params.id;

    if (!categoryId) {
        return response.status(400).json({message: 'Category id is required'});
    }

    try {
        const category: ICategory | null = await CategoriesModel.findById(categoryId).exec();
        response.status(200).send(category); 
    } catch (error) {
        response.status(500).send(error);
    }
}
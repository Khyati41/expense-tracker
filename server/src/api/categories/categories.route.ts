import {Router} from 'express';
import {createCategories, getCategory, getAllCategories} from './categories.controller.js';

const categoriesRoute: Router = Router();

categoriesRoute.get('/:id', (req, res) => getCategory(req, res));
categoriesRoute.get('/', (req, res) => getAllCategories(req, res));
categoriesRoute.post('/', (req, res) => createCategories(req, res));

export default categoriesRoute
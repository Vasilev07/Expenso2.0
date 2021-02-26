import { NextFunction, Request, Response } from 'express';

import { Statuses } from '../enums/status.enum';
import { ICategory } from '../models/category.interface';
import { createCategory, deleteCategoryById, getAllCategories } from '../services/category.service';

export const init = (app: any, collection: any): void => {
    app.get('/category', async(request: Request, response: Response, next: NextFunction): Promise<void> => {
        const categories = await getAllCategories(collection);

        response.status(Statuses.OK).send(categories);
    });

    app.post('/category', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const category = request.body as ICategory;

        await createCategory(collection, category);

        response.status(Statuses.OK).send({});
    });

    app.delete('/category', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const category = request.body as { id: string };

        try {
            const test = await deleteCategoryById(collection, category?.id);
            
        } catch (error) {
            console.log(error);
        }

        response.status(Statuses.OK).send({});
    });
};

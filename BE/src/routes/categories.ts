import { NextFunction, Request, Response } from 'express';

import { Statuses } from '../enums/status.enum';
import { ICategory } from '../models/category.interface';
import { createCategory, getAllCategories } from '../services/category.service';

export const init = (app: any, collection: any): void => {
    app.get('/category', async(request: Request, response: Response, next: NextFunction): Promise<void> => {
        // response.send('Hello Georgi!');
        const categories = await getAllCategories(collection);

        response.status(Statuses.OK).send(categories);
    });

    app.post('/category', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const category = request.body as ICategory;

        await createCategory(collection, category);

        response.status(Statuses.OK).send({});
    });
};

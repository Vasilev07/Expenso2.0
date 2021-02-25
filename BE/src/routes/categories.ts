import { NextFunction, Request, Response } from 'express';

import { Statuses } from '../enums/status.enum';
import { ICategory } from '../models/category.interface';
import { createCategory } from '../services/category.service';

export const init = (app: any, collection: any): void => {
    app.get('/category', (request: Request, response: Response, next: NextFunction): void => {
        // response.send('Hello Georgi!');
        response.status(Statuses.OK).send({ test: 'category' });
    });

    app.post('/category', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const category = request.body as ICategory;

        console.log(category);
        console.log(collection);
        await createCategory(collection, category);

        response.status(Statuses.OK).send({ test: 'category' });
    });
};

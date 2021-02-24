import { NextFunction, Request, Response } from 'express';
import { Db } from 'mongodb';

import { Statuses } from '../enums/status.enum';
import { ICategory } from '../models/category.interface';
import { createCategory } from '../services/category.service';

export const init = (app: any, db: Db): void => {
    app.get('/category', (request: Request, response: Response, next: NextFunction): void => {
        // response.send('Hello Georgi!');
        response.status(Statuses.OK).send({ test: 'category' });
    });

    app.post('/category', (request: Request, response: Response, next: NextFunction): void => {
        const category = request.body as ICategory;

        console.log(category);
        createCategory(db, category);

        response.status(Statuses.OK).send({ test: 'category' });
    });
};

import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { Statuses } from '../enums/status.enum';
import { checkAuth } from '../middleware/check-auth';
import { ICategory } from '../models/category.interface';
import { createCategory, deleteCategoryById, getAllCategories } from '../services/category.service';

export const init = (app: any, collection: any): void => {
    app.get('/category', checkAuth, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const token = request.headers.authorization as any;
        const decodedToken = decode(token.split(' ')[1]) as any;

        const categories = await getAllCategories(collection, new ObjectId(decodedToken.userId));

        response.status(Statuses.OK).send(categories);
    });

    app.post('/category', checkAuth, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const categoryFromUser = request.body as ICategory;
        const token = request.headers.authorization as any;
        const decodedToken = decode(token.split(' ')[1]) as any;

        const category = {
            ...categoryFromUser,
            userId: new ObjectId(decodedToken.userId),
        };

        await createCategory(collection, category);

        response.status(Statuses.OK).send(category);
    });

    app.delete('/category', checkAuth, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const category = request.body as { id: string };

        try {
            const test = await deleteCategoryById(collection, category?.id);
        } catch (error) {
            console.log(error);
        }

        response.status(Statuses.OK).send({});
    });
};

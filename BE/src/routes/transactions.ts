import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { IExpense } from '../models/transaction.interface';
import { addExpense } from '../services/transaction.service';

export const init = (app: any, collection: any): void => {
    app.post('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        console.log(await addExpense(collection, {} as IExpense));

        return response.status(200).json();
    });
};

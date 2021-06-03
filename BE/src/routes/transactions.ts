import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { addExpense } from '../services/transaction.service';

export const init = (app: any, collection: any): void => {
  app.post('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const filter = {
      userId: new ObjectId('60b3f2c0ae329307380afd58'),
      // because months starts from 0
      month: new Date().getMonth() + 1
    };
    const transaction = {
      date: new Date(),
      amount: 1,
      category: {
        categoryId: new ObjectId('60b403999b90911ed0273157'),
        name: "12312312312",
        icon: 'american-football-outline'
      }
    };

    await addExpense(
      collection,
      filter,
      transaction
    );

    return response.status(200).json();
  });
};

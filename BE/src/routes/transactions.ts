import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { addExpense, addIncome } from '../services/transaction.service';

export const init = (app: any, collection: any): void => {
  app.post('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const transaction = request.body;
    const date = new Date(transaction.date);

    const token = request.headers.authorization as any;

    const decodedToken = decode(token.split(' ')[1]) as any;
    const userId = decodedToken.userId;

    const isExpense = transaction.isExpense;

    const filter = {
      userId: new ObjectId(userId),
      date: `${date.getMonth() + 1}-${date.getFullYear()}`
    };

    const transactionToSave = {
      date: date.toString(),
      amount: parseFloat(transaction.amount),
      category: {
        categoryId: new ObjectId(transaction.category.categoryId),
        name: transaction.category.name,
        icon: transaction.category.icon
      }
    };

    isExpense ?
      await addExpense(
        collection,
        filter,
        transactionToSave
      ):
      await addIncome(
        collection,
        filter,
        transactionToSave
      )

    return response.status(200).json();
  });
};

import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { transactionSpendingsAggregation } from '../repositories/spendings';
import { addExpense, addIncome, getAllTransactions, getSpendings, updateTransaction } from '../services/transaction.service';

export const init = (app: any, collection: any): void => {
  app.get('/transaction/spendings', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const transaction = await getSpendings(collection, transactionSpendingsAggregation);

    response.send(transaction);
  });

  app.get('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const transactions = await getAllTransactions(collection, { date: "6-2021" });
    console.log('transactions', transactions);

    response.send(transactions);
  });

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
      _id: new ObjectId(),
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

  app.post('/transaction/:transactionsId/:currentTransactionId', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    console.log('asdasdasd');
    console.log(request.body);

    const transactions = await updateTransaction(collection, 'expenses', {transactionId: '1', currentTransactionId: '1'}, null);
    console.log('transactions', transactions);

    response.send(transactions);
  });
};

import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { transactionSpendingsAggregation } from '../repositories/spendings';
import { addExpense, addIncome, getAllTransactions, getSpendings, removeTransaction, updateTransaction } from '../services/transaction.service';

const addTransaction = async (collection: any, transaction: any, token: any, currentTransactionId: any) => {

    const date = new Date(transaction.date);

    const decodedToken = decode(token.split(' ')[1]) as any;
    const userId = decodedToken.userId;

    const isExpense = transaction.isExpense;

    const filter = {
        userId: new ObjectId(userId),
        date: `${date.getMonth() + 1}-${date.getFullYear()}`
    };

    const transactionToSave = {
        _id: currentTransactionId ? new ObjectId(currentTransactionId) : new ObjectId(),
        date: date.toString(),
        amount: parseFloat(transaction.amount),
        category: {
            categoryId: new ObjectId(transaction.category.categoryId),
            name: transaction.category.name,
            icon: transaction.category.icon,
            color: transaction.category.color
        }
    };

    isExpense ?
        await addExpense(
            collection,
            filter,
            transactionToSave
        ) :
        await addIncome(
            collection,
            filter,
            transactionToSave
        );
}

export const init = (app: any, collection: any): void => {
    app.get('/transaction/spendings/:date', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const date = new Date(request.params.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        console.log(month);
        console.log(year);

        const transaction = await getSpendings(collection, transactionSpendingsAggregation(`${month}-${year}`));

        response.send(transaction);
    });

    app.get('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();

        const transactions = await getAllTransactions(collection, { date: `${currentMonth}-${currentYear}` });

        response.send(transactions);
    });

    app.post('/transaction', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        await addTransaction(collection, request.body, request.headers.authorization, null);

        return response.status(200).json();
    });

    app.post('/transaction/:transactionsId/:currentTransactionId', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const transaction = request.body;

        const transactionId = request.params.transactionsId;
        const currentTransactionId = request.params.currentTransactionId;
        const isExpense = transaction.isExpense;

        const removeFrom = isExpense ? 'expenses' : 'incomes';

        await removeTransaction(collection, removeFrom, transactionId, currentTransactionId);
        await addTransaction(collection, request.body, request.headers.authorization, currentTransactionId);

        return response.status(200).json();
    });

    app.delete('/transaction/:transactionsId/:currentTransactionId/:isExpense', async (request: Request, response: Response, next: NextFunction) => {
        const transactionId = request.params.transactionsId;
        const currentTransactionId = request.params.currentTransactionId;
        const isExpense = request.params.isExpense;
        const removeFrom = isExpense === 'true' ? 'expenses' : 'incomes';

        await removeTransaction(collection, removeFrom, transactionId, currentTransactionId);

        return response.status(200).json();
    });
};

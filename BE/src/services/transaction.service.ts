import { ObjectId } from "mongodb";
import { IExpense, IIncome, ITransaction } from "../models/transaction.interface";
import { IRepository } from "../repositories/mongo.repository";

export const addExpense = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, date: string }, entity: IExpense): Promise<void> => {
    await collection.updateManyAddInArray(criteria, 'expenses', entity);
};

export const addIncome = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, date: string }, entity: IIncome): Promise<void> => {
    await collection.updateManyAddInArray(criteria, 'incomes', entity);
};

export const getSpendings = async (collection: IRepository<ITransaction>, aggregation: any): Promise<ITransaction[]> => {
    return await collection.performAggregation(aggregation);
};

export const getAllTransactions = async (collection: IRepository<ITransaction>, criteria: {}): Promise<ITransaction[]> => {
    return await collection.findBy(criteria);
};

export const updateTransaction = async (collection: IRepository<ITransaction>, toUpdate: string, criteria: { transactionId: string, currentTransactionId: string }, entity: any) => {
    return await collection.updateManyArray(criteria, toUpdate, entity);
};

export const removeTransaction = async (collection: IRepository<ITransaction>, removeFrom: string, transactionId: string, currentTransactionId: string) => {
    const criteria = { _id: new ObjectId(transactionId) };
    collection.removeFromArray(criteria, removeFrom, new ObjectId(currentTransactionId));
};

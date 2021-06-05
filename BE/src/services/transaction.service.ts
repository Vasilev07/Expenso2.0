import { ObjectId } from "mongodb";
import { IExpense, IIncome, ITransaction } from "../models/transaction.interface";
import { IRepository } from "../repositories/mongo.repository";

export const addExpense = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, date: string }, entity: IExpense): Promise<void> => {
  await collection.updateManyArray(criteria, 'expenses', entity);
};

export const addIncome = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, date: string }, entity: IIncome): Promise<void> => {
  await collection.updateManyArray(criteria, 'income', entity);
};

export const getSpendings =  async (collection: IRepository<ITransaction>, aggregation: any): Promise<ITransaction[]> => {
  return await collection.performAggregation(aggregation);
};

import { ObjectId } from "mongodb";
import { IExpense, IIncome, ITransaction } from "../models/transaction.interface";
import { IRepository } from "../repositories/mongo.repository";

export const addExpense = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, month: number }, entity: IExpense): Promise<void> => {
  await collection.updateManyArray(criteria, 'expenses', entity);
};

export const addIncome = async (collection: IRepository<ITransaction>, criteria: { userId: ObjectId, month: number }, entity: IIncome): Promise<void> => {
  await collection.updateManyArray(criteria, 'income', entity);
};

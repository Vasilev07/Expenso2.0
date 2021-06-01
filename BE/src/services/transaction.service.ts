import { IExpense, ITransaction } from "../models/transaction.interface";
import { IRepository } from "../repositories/mongo.repository";

export const addExpense = async (collection: IRepository<ITransaction>, entity: IExpense): Promise<void> => {
  console.log(collection);

  await collection.aggregate(undefined);
};

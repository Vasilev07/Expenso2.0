import { ObjectId } from "mongodb";
import { ICategory } from "./category.interface";

export interface ITransaction {
  userId: ObjectId;
  _id?: ObjectId;
  date: Date;
  totalBalance: number;
  expences: IExpense[];
  income: IIncome[];
}

export interface IExpense {
  date: Date;
  amount: number;
  category: ICategory;
  name: string;
  icon: string;
  color: string
}

export interface IIncome {
  date: Date;
  amount: number;
  category: ICategory;
  name: string;
  icon: string;
  color: string
}


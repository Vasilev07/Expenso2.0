import { ObjectId } from "mongodb";
import { ICategory } from "./category.interface";

export interface ITransaction {
  userId: ObjectId;
  _id?: ObjectId;
  date: Date;
  totalBalance: number;
  expenses: IExpense[];
  income: IIncome[];
}

export interface IExpense {
  date: Date;
  amount: number;
  category: IExpenseIncomeCategory;
}

export interface IIncome {
  date: Date;
  amount: number;
  category: IExpenseIncomeCategory;
}

export interface IExpenseIncomeCategory {
    categoryId: ObjectId;
    name: string;
    icon: string;
}

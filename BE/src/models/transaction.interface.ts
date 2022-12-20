import { ObjectId } from 'mongodb';

export interface IExpenseIncomeCategory {
    categoryId: ObjectId;
    name: string;
    icon: string;
}

export interface IExpense {
    date: string;
    amount: number;
    category: IExpenseIncomeCategory;
}

export interface IIncome {
    date: string;
    amount: number;
    category: IExpenseIncomeCategory;
}

export interface ITransaction {
    userId: ObjectId;
    _id?: ObjectId;
    date: string;
    totalBalance: number;
    expenses?: IExpense[];
    incomes?: IIncome[];
}

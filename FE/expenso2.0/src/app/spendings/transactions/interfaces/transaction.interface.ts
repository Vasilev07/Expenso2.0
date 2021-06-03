export interface ITransaction {
  date: Date;
  totalBalance: number;
  data: IExpense | IIncome
  isExpese: boolean;
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
    categoryId: string;
    name: string;
    icon: string;
}

export interface ITransaction {
  date: Date;
  amount: number;
  category: IExpenseIncomeCategory;
  isExpense: boolean;
}

export interface IExpenseIncomeCategory {
    categoryId: string;
    name: string;
    icon: string;
}

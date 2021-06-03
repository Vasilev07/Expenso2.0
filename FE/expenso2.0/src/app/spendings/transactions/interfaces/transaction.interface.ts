export interface ITransaction {
  date: Date;
  amount: number;
  category: IExpenseIncomeCategory;
  isExpese: boolean;
}

export interface IExpenseIncomeCategory {
    categoryId: string;
    name: string;
    icon: string;
}

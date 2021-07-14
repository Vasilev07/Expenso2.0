export interface ITransaction {
    date: string;
    amount: number;
    category: IExpenseIncomeCategory;
    isExpense: boolean;
}

export interface IExpenseIncomeCategory {
    categoryId: string;
    name: string;
    icon: string;
    color: string;
}

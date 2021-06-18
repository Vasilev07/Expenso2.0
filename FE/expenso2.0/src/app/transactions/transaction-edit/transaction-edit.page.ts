import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ICategory } from "src/app/categories/category.interface";
import { IExpenseIncomeCategory, ITransaction } from "src/app/spendings/transactions/interfaces/transaction.interface";
import { editTransaction } from "./actions/transaction-edit.action";

@Component({
  selector: 'transactions-edit',
  templateUrl: './transaction-edit.page.html'
})
export class TransactionEditPage implements OnInit {
  private transactions: any;
  private transactionId: string;
  private currentTransactionId: string;
  public foundTransaction: any;
  public expenseSelector: string;
  public isExpense: boolean;
  public date: string = new Date().toISOString();
  public amount: number;
  public selectedCategory: IExpenseIncomeCategory;

  public constructor(private readonly store: Store<{ transactions: [] }>,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.transactionId = this.activatedRoute.snapshot.params.transactionId;
    this.currentTransactionId = this.activatedRoute.snapshot.params.currentTransactionId;

    // when transactions in store are empty redirect to load them
    this.store.select('transactions').subscribe((transactions: any) => {
      this.transactions = transactions;

      if (this.transactions && this.transactions.length > 0) {
        const foundTransaction = this.transactions.find((transaction) => transaction._id === this.transactionId);
        const expences = foundTransaction.expenses.map((expense) => ({ ...expense, isExpense: true }));
        const incomes = foundTransaction.incomes.map((expense) => ({ ...expense, isExpense: false }));

        const spendings = [...expences, ...incomes];
        this.foundTransaction = spendings.find((spending) => spending._id === this.currentTransactionId);

        this.expenseSelector = this.foundTransaction.isExpense ? 'expense' : 'income';
        this.date = this.foundTransaction.date;
        this.amount = this.foundTransaction.amount;
        this.selectedCategory = this.foundTransaction.category;
      } else {
        this.router.navigate(['/expenso/tabs/transactions/']);
      }
    });
  }

  public expenseToggleSwitched(value: any): void {
    this.isExpense = value.detail.value === 'expense';
    this.expenseSelector = this.isExpense ? 'expense' : 'income';
  }

  public onCancelClick(): void {
    this.router.navigate(['/expenso/tabs/transactions/']);
  }

  public onSaveClick(): void {
    const transaction: ITransaction = {
      date: this.date,
      amount: this.amount,
      category: this.selectedCategory,
      isExpense: this.isExpense || this.expenseSelector === 'expense'
    };

    this.store.dispatch(editTransaction({
      transaction,
      transactionId: this.transactionId,
      currentTransactionId: this.currentTransactionId
    }));
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITransaction } from '../spendings/transactions/interfaces/transaction.interface';
import { retrieveTransactions } from './actions/transactions.action';

@Component({
  selector: 'transactions',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage implements OnInit {
  private transactions: any;
  public mergedTransactions: any;

  constructor(private readonly store: Store<{ transactions: [] }>) { }

  public ngOnInit(): void {
    this.store.select('transactions').subscribe((transactions: any) => {
      this.transactions = transactions[0];

      if (this.transactions) {
        const expences = this.transactions.expenses.map((expense) => ({ ...expense, isExpense: true }));
        const incomes = this.transactions.incomes.map((expense) => ({ ...expense, isExpense: false }));

        this.mergedTransactions = [...expences, ...incomes];
        console.log(this.mergedTransactions);
      }
    });

    this.store.dispatch(retrieveTransactions())
  }
}

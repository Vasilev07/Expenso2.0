import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private readonly store: Store<{ transactions: [] }>,
              private readonly router: Router) { }

  public ngOnInit(): void {
    this.store.select('transactions').subscribe((transactions: any) => {
      this.transactions = transactions[0];

      if (this.transactions) {
        const transactionId = this.transactions._id;
        const expences = this.transactions.expenses.map((expense) => ({ ...expense, isExpense: true, transactionId }));
        const incomes = this.transactions.incomes.map((income) => ({ ...income, isExpense: false, transactionId  }));

        this.mergedTransactions = [...expences, ...incomes];
      }
    });

    this.store.dispatch(retrieveTransactions())
  }

  public onTransactionEdit(transaction): void {
    this.router.navigate([`/expenso/tabs/transactions/${transaction.transactionId}/edit/${transaction._id}`]);
  }
}

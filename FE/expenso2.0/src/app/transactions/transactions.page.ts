import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ITransaction } from '../spendings/transactions/interfaces/transaction.interface';
import { deleteTransaction, retrieveTransactions } from './actions/transactions.action';

@Component({
  selector: 'transactions',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage implements OnInit {
  private transactions: any;
  public mergedTransactions: any;
  public user;
  public filteredData: any;

  constructor(private readonly store: Store<{ transactions: [], user: [] }>,
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

      this.filteredData = this.mergedTransactions;
    });

    this.store.select('user').subscribe((user: any) => {
      this.user = user[0];
    });

    this.store.dispatch(retrieveTransactions())
  }

  public onTransactionEdit(transaction): void {
    this.router.navigate([`/expenso/tabs/transactions/${transaction.transactionId}/edit/${transaction._id}`]);
  }

  public onDeleteTransaction(transaction): void {
    this.store.dispatch(deleteTransaction({ transaction: transaction }));
  }

  public onSearchTriggered(event): void {
    const searchTerm = event.detail.value;

    this.filteredData = this.mergedTransactions.filter((transaction) => {
      return transaction.category.name.toLowerCase().includes(searchTerm)
    });
  }
}

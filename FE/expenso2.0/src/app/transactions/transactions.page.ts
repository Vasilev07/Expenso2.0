import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveTransactions } from './actions/transactions.action';

@Component({
  selector: 'transactions',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage implements OnInit {

  constructor(private readonly store: Store<{ transactions: [] }>) {}

  public ngOnInit(): void {
    this.store.dispatch(retrieveTransactions())
  }
}

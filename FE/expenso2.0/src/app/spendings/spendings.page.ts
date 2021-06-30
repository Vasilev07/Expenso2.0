import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { retrieveTransactions } from './transactions/actions/transaction.action';

@Component({
  selector: 'app-spendings',
  templateUrl: 'spendings.page.html',
  styleUrls: ['spendings.page.scss']
})
export class SpendingsPage implements OnInit {
  public isExpense: boolean;
  public spendings: any;
  public date = new Date().toISOString();

  public constructor(private readonly router: Router,
                    private readonly store: Store<{ spendings: [] }>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(retrieveTransactions());

    this.store.select('spendings').subscribe((spendings) => {
      this.spendings = spendings;
    });
  }

  public onTransactionClick(value: string): void {
    this.isExpense = value === "expense";

    this.router.navigate(['/expenso/tabs/spendings/transaction'], {queryParams: { isExpense: this.isExpense }});
  }

  public onUserSettingsClick(): void {
    console.log(this.router);


    this.router.navigate(['/user-settings']);
  }
}

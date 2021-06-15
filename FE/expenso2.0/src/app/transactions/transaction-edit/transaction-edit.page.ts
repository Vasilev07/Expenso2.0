import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: 'transactions-edit',
  templateUrl: './transaction-edit.page.html'
})
export class TransactionEditPage implements OnInit {
  private transactions: any;

  public constructor(private readonly store: Store<{ transactions: [] }>,
                    private readonly router: Router) {

  }

  public ngOnInit(): void {
    // if transactions in store are empty redirect to load them
    this.store.select('transactions').subscribe((transactions: any) => {
      this.transactions = transactions[0];

      if (this.transactions) {
        const transactionId = this.transactions._id;
        // const expences = this.transactions.expenses.map((expense) => ({ ...expense, isExpense: true, transactionId }));
        // const incomes = this.transactions.incomes.map((expense) => ({ ...expense, isExpense: false, transactionId  }));
      } else {
          this.router.navigate(['/expenso/tabs/transactions/'])
      }
    });
  }
}

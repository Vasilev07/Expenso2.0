import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  templateUrl: './transaction.page.html'
})
export class TransactionPage {
  public isExpense: boolean;
  public date = new Date().toLocaleDateString();

  public constructor(private readonly router: Router) {
  }

  public expenseToggleSwitched(value: CustomEvent): void {
    this.isExpense = value.detail.value === 'expense';
  }

  public onCategorySelect(): void {
    this.router.navigate(['/expenso/tabs/spendings/transaction/category-selector'], {queryParams: { isExpense: `true` }});
  }
}

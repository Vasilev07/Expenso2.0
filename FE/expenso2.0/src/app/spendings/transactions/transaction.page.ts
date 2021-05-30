import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: './transaction.page.html'
})
export class TransactionPage {
  public isExpense: boolean;
  public date = new Date().toLocaleDateString();

  public expenseToggleSwitched(value: CustomEvent): void {
    this.isExpense = value.detail.value === 'expense';
  }
}

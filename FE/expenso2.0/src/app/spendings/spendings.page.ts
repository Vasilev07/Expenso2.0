import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spendings',
  templateUrl: 'spendings.page.html',
  styleUrls: ['spendings.page.scss']
})
export class SpendingsPage {
  public isExpense: boolean;

  public constructor(private readonly router: Router) {

  }

  public onTransactionClick(value: string): void {
    this.isExpense = value === "expense";


  }
}

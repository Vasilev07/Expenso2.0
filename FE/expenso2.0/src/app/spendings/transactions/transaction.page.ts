import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ICategory } from "src/app/categories/category.interface";
import { CategorySelectorService } from "./category-selector/category-selected.service";

@Component({
  templateUrl: './transaction.page.html'
})
export class TransactionPage implements OnInit {
  public isExpense: boolean;
  public date = new Date();
  public selectedCategory: ICategory;

  public constructor(private readonly router: Router,
                    private readonly categorySelectorService: CategorySelectorService) {
  }

  public ngOnInit(): void {
    this.categorySelectorService.categorySelected.subscribe((category: ICategory) => {
      this.selectedCategory = category;
    });
    console.log('whole date', this.date);
    console.log('month', this.date.getMonth());
    console.log('year', this.date.getFullYear());

  }

  public expenseToggleSwitched(value: CustomEvent): void {
    this.isExpense = value.detail.value === 'expense';
  }

  public onCategorySelect(): void {
    this.router.navigate(['/expenso/tabs/spendings/transaction/category-selector'], {queryParams: { isExpense: `true` }});
  }
}

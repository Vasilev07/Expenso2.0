import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { ICategory } from "src/app/categories/category.interface";
import { createTransaction } from "./actions/transaction.action";
import { CategorySelectorService } from "./category-selector/category-selected.service";
import { ITransaction } from "./interfaces/transaction.interface";

@Component({
  templateUrl: './transaction.page.html'
})
export class TransactionPage implements OnInit {
  public isExpense: boolean;
  public date = new Date();
  public selectedCategory: ICategory;
  public amount: number;

  public constructor(private readonly router: Router,
                    private readonly categorySelectorService: CategorySelectorService,
                    private readonly navCtrl: NavController,
                    private readonly store: Store) {
  }

  public ngOnInit(): void {
    this.categorySelectorService.categorySelected.subscribe((category: ICategory) => {
      console.log(category);

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

  public onSaveClick(): void {
    const transaction: ITransaction = {
        date: this.date,
        amount: this.amount,
        isExpese: this.isExpense,
        category: {
          categoryId: this.selectedCategory.id,
          name: this.selectedCategory.name,
          icon: this.selectedCategory.icon
        }
    };

    this.store.dispatch(createTransaction({transaction}));

    this.navCtrl.back();
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }
}

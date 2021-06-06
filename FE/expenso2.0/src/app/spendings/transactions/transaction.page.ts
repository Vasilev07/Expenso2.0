import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { ICategory } from "src/app/categories/category.interface";
import { createTransaction, retrieveTransactions } from "./actions/transaction.action";
import { CategorySelectorService } from "./category-selector/category-selected.service";
import { ITransaction } from "./interfaces/transaction.interface";

@Component({
  templateUrl: './transaction.page.html'
})
export class TransactionPage implements OnInit {
  public isExpense: boolean = true;
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

      this.selectedCategory = category;
    });
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
        isExpense: this.isExpense,
        category: {
          categoryId: this.selectedCategory._id,
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

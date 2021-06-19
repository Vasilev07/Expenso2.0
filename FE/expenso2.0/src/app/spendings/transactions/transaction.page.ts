import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  public isExpense: boolean;
  public date = new Date().toISOString();
  public selectedCategory: ICategory;
  public amount: number;
  public expenseSelector: string;

  public constructor(private readonly router: Router,
                    private readonly categorySelectorService: CategorySelectorService,
                    private readonly navCtrl: NavController,
                    private readonly store: Store,
                    private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.isExpense = this.activatedRoute.snapshot.queryParams.isExpense === 'true';

    this.expenseSelector = this.isExpense ? 'expense' : 'income';

    this.categorySelectorService.categorySelected.subscribe((category: ICategory) => {
      this.selectedCategory = category;
    });
  }

  public expenseToggleSwitched(value: CustomEvent): void {
    this.isExpense = value.detail.value === 'expense';
  }

  public onCategorySelect(): void {
    this.router.navigate(['/expenso/tabs/spendings/transaction/category-selector'], {queryParams: { isExpense: this.isExpense }});
  }

  public onSaveClick(): void {
    const transaction: ITransaction = {
        date: this.date,
        amount: this.amount,
        isExpense: this.isExpense,
        category: {
          categoryId: this.selectedCategory._id,
          name: this.selectedCategory.name,
          icon: this.selectedCategory.icon,
          color: this.selectedCategory.color
        }
    };

    this.store.dispatch(createTransaction({transaction}));

    this.navCtrl.back();
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }
}

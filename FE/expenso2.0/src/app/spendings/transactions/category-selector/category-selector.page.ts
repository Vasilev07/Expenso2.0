import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { logging } from "protractor";
import { retrieveCategoryList } from "src/app/categories/actions/categories.action";
import { ICategory } from "src/app/categories/category.interface";

@Component({
  templateUrl: 'category-selector.page.html'
})
export class CategorySelectorPage implements OnInit {
  public filteredCategories: ICategory[];
  public isExpense: boolean;

  public constructor(private readonly store: Store<{ categories: [] }>,
                    private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.store.dispatch(retrieveCategoryList());

    this.isExpense = this.activatedRoute.snapshot.queryParams.isExpense;

    this.store.select('categories').subscribe((categories: ICategory[]) => {
      this.filteredCategories = categories.filter((category: ICategory) => category.isExpense !== this.isExpense);
    });
  }
}

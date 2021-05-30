import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { createCategory } from "../actions/categories.action";
import { ICategoryIcons } from "./category-icon-create/category-icons";
import { colorList } from "./color-list";
import { CategoryIconService } from "./services/category-icon.service";

@Component({
    templateUrl: 'category-create.page.html',
})
export class CategoryCreatePage implements OnInit {
   public colorList = [...colorList];
   public categoryName: string;
   public icon: ICategoryIcons;
   public color: string;
   public isExpense: boolean = false;

   public constructor(private readonly router: Router,
                      private readonly store: Store<{ categories: [] }>,
                      private readonly categoryIconService: CategoryIconService) {
   }

    public ngOnInit(): void {
      this.categoryIconService.iconSelected.subscribe((icon: ICategoryIcons) => {
        this.icon = icon;
      });
    }

    public onSaveClick(): void {
      this.store.dispatch(createCategory({category: {color: this.color, icon: this.icon.name, name: this.categoryName, isExpense: this.isExpense}}));

      this.router.navigate(['/expenso/tabs/categories']);
    }

    public onCancelClick(): void {
        this.router.navigate(['/expenso/tabs/categories']);
    }

    public onIconSelect(): void {
      this.router.navigate(['expenso/tabs/categories/icon/create']);
    }

    public colorSelected(color: string): void {
        this.color = color;
    }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { createCategory } from "../actions/categories.action";
import { colorList } from "./color-list";

@Component({
    templateUrl: 'category-create.page.html',
})
export class CategoryCreatePage implements OnInit {
   public colorList = [...colorList];
   public categoryName: string;
   public icon: string;
   public color: string;

   public constructor(private readonly router: Router,
                      private readonly store: Store<{ categories: [] }>) {
   }

    public ngOnInit(): void {
    }

    public onSaveClick(): void {
      this.store.dispatch(createCategory({category: {color: this.color, iconUrl: this.icon, name: this.categoryName}}));

      this.router.navigate(['/expenso/categories']);
    }

    public onCancelClick(): void {
        this.router.navigate(['/expenso/categories']);
    }

    public onIconSelect(): void {
      // this.router.navigate(['tabs/categories/icon/create']);

        // this.icon = icon;
    }

    public colorSelected(color: string): void {
      console.log('IN COLOR', color);

        this.color = color;
    }
}

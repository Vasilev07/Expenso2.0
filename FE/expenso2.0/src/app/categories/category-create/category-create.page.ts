import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryIcon } from "./category-icons.enum";
import { colorList } from "./color-list";

@Component({
    templateUrl: 'category-create.page.html',
})
export class CategoryCreatePage implements OnInit {
   public categoryIcons: string[];
   public colorList = [...colorList];
   public categoryName: string;
   public icon: string;
   public color: string;

   public constructor(private readonly router: Router) {
   }

    public ngOnInit(): void {
        this.categoryIcons = Object.keys(CategoryIcon).filter(key => CategoryIcon[key]);
    }

    public onSaveClick(): void {
        console.log('name', this.categoryName);
        console.log('color', this.color);
        console.log('icon', this.icon);

    }

    public onCancelClick(): void {
        this.router.navigate(['/tabs/categories']);
    }

    public iconSelected(icon: string): void {
        this.icon = icon;
    }

    public colorSelected(color: string): void {
        this.color = color;
    }
}
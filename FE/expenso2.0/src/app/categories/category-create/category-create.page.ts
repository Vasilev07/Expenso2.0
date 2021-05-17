import { Component, OnInit } from "@angular/core";
import { CategoryIcon } from "./category-icons.enum";
import { colorList } from "./color-list";

@Component({
    templateUrl: 'category-create.page.html',
})
export class CategoryCreatePage implements OnInit {
   public categoryIcons: string[];
   public colorList = [...colorList];

    public ngOnInit(): void {
        this.categoryIcons = Object.keys(CategoryIcon).filter(key => CategoryIcon[key]);
    }
}
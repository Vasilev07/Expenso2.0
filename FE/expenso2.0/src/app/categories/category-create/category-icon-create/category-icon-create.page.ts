import { Component } from "@angular/core";
import { categoryIcons, ICategoryIcons } from "./category-icons";

@Component({
  templateUrl: './category-icon-create.page.html'
})
export class CategoryIconCreatePage {
  public readonly icons: ICategoryIcons[] = categoryIcons;

  public ngOnInit(): void {
    console.log('icons', this.icons);

  }
}

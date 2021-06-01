import { Component, Input } from "@angular/core";

import { ICategory } from "../category.interface";

@Component({
  selector: 'category-select',
  templateUrl: './category-select.page.html'
})
export class CategorySelectPage {
  @Input()
  public categories: ICategory[];
}

import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ICategory } from "../category.interface";

@Component({
  selector: 'category-select',
  templateUrl: './category-select.page.html'
})
export class CategorySelectPage {
  @Input()
  public categories: ICategory[];

  @Output()
  public readonly categorySelected: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  public onCategorySelect(category: ICategory): void {
    this.categorySelected.emit(category);
  }
}

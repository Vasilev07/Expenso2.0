import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
  })
  export class CategoryPage {
    @Input() categoryName: string;
    
  }
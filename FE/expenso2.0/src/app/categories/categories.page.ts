import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retrieveCategoryList } from '../actions/categories.action';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  public categories$: Observable<any[]>;

  constructor(private readonly store: Store<{ categories: [] }>,
              private readonly categoriesService: CategoriesService) {
    this.categories$ = store.select('categories');
  }

  public ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories) =>  this.store.dispatch(retrieveCategoryList({ categories })))
  }
}

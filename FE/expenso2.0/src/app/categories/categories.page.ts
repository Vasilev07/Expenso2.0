import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retrieveCategoryList } from './actions/categories.action';
import { ICategory } from './category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  public categories$: Observable<ICategory[]>;

  constructor(private readonly store: Store<{ categories: [] }>,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.categories$ = this.store.select('categories');

    this.store.dispatch(retrieveCategoryList());
  }

  public addNewCategory(): void {
    this.router.navigate(['tabs/categories/create'])
  }
}

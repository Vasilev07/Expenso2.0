import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retrieveCategoryList } from './actions/categories.action';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  public categories$: Observable<any[]>;

  constructor(private readonly store: Store<{ categories: [] }>,
              private readonly router: Router) {
    this.categories$ = store.select('categories');
  }

  public ngOnInit(): void {
    this.store.dispatch(retrieveCategoryList());
  }

  public addNewCategory(): void {
    this.router.navigate(['tabs/categories/create'])
  }
}

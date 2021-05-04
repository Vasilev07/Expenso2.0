import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createCategory } from '../actions/categories.action';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  public categories$: Observable<any[]>;

  constructor(private store: Store<{ categories: [] }>) {
    this.categories$ = store.select('categories');
  }

  public ngOnInit(): void {
    this.store.dispatch(createCategory())

    this.categories$.subscribe(console.log);

  }
}

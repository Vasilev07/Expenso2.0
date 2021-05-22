import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retrieveCategoryList } from './actions/categories.action';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  public categories$: Observable<any[]>;

  constructor(private readonly store: Store<{ categories: [] }>,
              private readonly categoriesService: CategoriesService,
              private readonly router: Router) {
    this.categories$ = store.select('categories');
  }

  public ngOnInit(): void {
    this.categoriesService
      .getAll()
      .subscribe((categories) =>  this.store.dispatch(retrieveCategoryList({ categories })));
  }

  public addNewCategory(): void {
    this.router.navigate(['tabs/categories/create'])
  }
}

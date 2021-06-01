import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveCategoryList } from '../categories/actions/categories.action';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private readonly store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(retrieveCategoryList());
  }
}

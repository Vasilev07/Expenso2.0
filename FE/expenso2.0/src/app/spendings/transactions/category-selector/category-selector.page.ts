import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/categories/category.interface';
import { CategorySelectorService } from './category-selected.service';

@Component({
    templateUrl: 'category-selector.page.html'
})
export class CategorySelectorPage implements OnInit {
    public filteredCategories: ICategory[];
    public isExpense: boolean;

    public constructor(private readonly store: Store<{ categories: [] }>,
        private readonly activatedRoute: ActivatedRoute,
        private readonly navCtrl: NavController,
        private readonly categorySelectorService: CategorySelectorService) {
    }

    public ngOnInit(): void {
        this.isExpense = this.activatedRoute.snapshot.queryParams.isExpense === 'true';

        this.store.select('categories').subscribe((categories: ICategory[]) => {
            this.filteredCategories = categories.filter((category: ICategory) => category.isExpense === this.isExpense);
        });
    }

    public onCancelClick(): void {
        this.navCtrl.back();
    }

    public onCategorySelected(selectedCategory: ICategory): void {
        this.categorySelectorService.categorySelected.next(selectedCategory);
        this.navCtrl.back();
    }
}

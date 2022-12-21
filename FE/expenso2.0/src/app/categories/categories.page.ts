import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICategory } from './category.interface';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
    public categories: ICategory[];
    public filteredCategories: ICategory[];
    public isExpense: boolean = true;
    public filteredData: ICategory[];

    constructor(private readonly store: Store<{ categories: [] }>,
        private readonly router: Router) {
    }

    public ngOnInit(): void {
        this.store.select('categories').subscribe((categories: ICategory[]) => {
            this.categories = categories;
            this.filteredCategories = this.filterCategoriesOnTypChange(this.categories, this.isExpense);
            this.filteredData = this.filteredCategories;
        });
    }

    public addNewCategory(): void {
        this.router.navigate(['expenso/tabs/categories/create'])
    }

    public expenseToggleSwitched(event: CustomEvent): void {
        this.isExpense = event.detail.value === 'expense';

        this.filteredCategories = this.filterCategoriesOnTypChange(this.categories, this.isExpense);
        this.filteredData = this.filteredCategories;
    }

    public onSearchTriggered(event): void {
        const searchTerm = event.detail.value;

        this.filteredData = this.filteredCategories.filter((category) => {
            return category.name.toLowerCase().includes(searchTerm);
        });
    }

    private filterCategoriesOnTypChange(categories: ICategory[], isExpense: boolean): ICategory[] {
        console.log(categories);

        return categories.filter((category: ICategory) => category.isExpense === isExpense);
    }

}

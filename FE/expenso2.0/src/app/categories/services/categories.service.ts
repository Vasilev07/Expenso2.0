import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ICategory } from "../category.interface";

@Injectable({providedIn: 'root'})
export class CategoriesService {
    private categories: ICategory[] = [
        {name: 'heets', color: 'red', iconUrl: 'blabla'},
        {name: 'home', color: 'blue', iconUrl: 'blabla'},
        {name: 'food', color: 'yellow', iconUrl: 'blabla'},
    ];

    getCategories(): Observable<ICategory[]> {
        return of(this.categories);
    }
}
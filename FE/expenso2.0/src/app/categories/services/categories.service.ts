import { HttpClient } from "@angular/common/http";
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

    constructor(private readonly httpClient: HttpClient) {}

    getCategories(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>('http://localhost:3001/category');
    }
}
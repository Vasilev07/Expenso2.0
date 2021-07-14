import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ICategory } from "src/app/categories/category.interface";

@Injectable({
    providedIn: 'root'
})
export class CategorySelectorService {
    public categorySelected: Subject<ICategory> = new Subject<ICategory>();
}

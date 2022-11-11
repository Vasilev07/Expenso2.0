import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICategoryIcons } from '../category-icon-create/category-icons';

@Injectable({
    providedIn: 'root'
})
export class CategoryIconService {
    public iconSelected: Subject<ICategoryIcons> = new Subject();
}

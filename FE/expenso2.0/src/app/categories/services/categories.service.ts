import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../category.interface';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    constructor(private readonly httpClient: HttpClient) { }

    public getAll(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>('http://0.0.0.0:8080/category');
    }

    public addNew(category: ICategory): Observable<ICategory> {
        return this.httpClient.post<ICategory>('http://0.0.0.0:8080/category', category);
    }
}

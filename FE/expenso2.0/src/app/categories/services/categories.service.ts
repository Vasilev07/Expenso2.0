import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../category.interface';
import { BASE_PATH } from '../../app-configuration.constants';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    private baseUrl: string;

    constructor(private readonly httpClient: HttpClient,
                @Optional() @Inject(BASE_PATH) basePath: string) {
        this.baseUrl = basePath ? basePath : 'http://0.0.0.0:8080';
    }

    public getAll(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>(`${ this.baseUrl }/category`);
    }

    public addNew(category: ICategory): Observable<ICategory> {
        return this.httpClient.post<ICategory>(`${ this.baseUrl }/category`, category);
    }
}

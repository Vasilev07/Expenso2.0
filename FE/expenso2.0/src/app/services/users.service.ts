import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserDetails } from '../interfaces/user.interface';
import { StorageService } from './storage.service';
import { BASE_PATH } from '../app-configuration.constants';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private baseUrl: string;

    public constructor(private readonly httpService: HttpClient,
                       private storageService: StorageService,
                       @Optional() @Inject(BASE_PATH) basePath: string) {
        console.log('baseUrl', basePath);
        this.baseUrl = basePath;
    }

    public login(user: IUser): Observable<any> {
        return this.httpService.post('http://localhost:8080/login', user);
    }

    public healthCheck(): Observable<any> {
        return this.httpService.get(`${ this.baseUrl }/health`);
    }

    public storeToken(token): void {
        this.storageService.set('token', `${ token }`);
    }

    public getToken(): any {
        return this.storageService.get('token');
    }

    public updateUserPreferences(userDetails: IUserDetails): any {
        return this.httpService.post<IUserDetails>('http://0.0.0.0:8080/userPrefferences', userDetails);
    }
}

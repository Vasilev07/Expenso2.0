import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser, IUserDetails } from "../interfaces/user.interface";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public constructor(private readonly httpService: HttpClient,
        private storageService: StorageService) {
    }

    public login(user: IUser): Observable<any> {
        return this.httpService.post('http://localhost:8080/login', user);
    }

    public storeToken(token): void {
        this.storageService.set("token", `${token}`);
    }

    public getToken(): any {
        return this.storageService.get('token');
    }

    public updateUserPreferences(userDetails: IUserDetails): any {
        return this.httpService.post<IUserDetails>('http://0.0.0.0:8080/userPrefferences', userDetails);
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public constructor(private readonly httpService: HttpClient,
                    private storageService: StorageService) {
  }

  public login(user: IUser): Observable<any> {
    return this.httpService.post('http://localhost:3001/login', user);
  }

  public async storeToken(token): Promise<void> {
    this.storageService.set("token", `${token}`);
  }

  public getToken(): any {
    return this.storageService.get('token');
  }
}

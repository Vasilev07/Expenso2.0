import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public constructor(private readonly httpService: HttpClient) {
  }

  public login(user: IUser): Observable<any> {
    console.log(user);

    return this.httpService.post('http://localhost:3001/login', user);
  }
}

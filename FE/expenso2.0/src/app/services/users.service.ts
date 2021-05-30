import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public constructor(private readonly httpService: HttpClient) {
  }

  public login(user: IUser): void {
    this.httpService.post('http://localhost:3001/login', user);
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public constructor(private readonly usersService: UsersService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.usersService.getToken())
    {
      request = this.addToken(request, this.usersService.getToken());
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

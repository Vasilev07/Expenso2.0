import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UsersService } from "../services/users.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public constructor(private readonly usersService: UsersService) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.usersService.getToken().pipe(
            switchMap((token) => next.handle(request.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } })))
        );
    }
}

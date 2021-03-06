import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private user: IUser;

    public constructor(private readonly store: Store<{ user: IUser }>,
        private readonly router: Router) {
        this.store.select('user').subscribe((user) => {
            this.user = user;
        });
    }

    public canActivate(): any {
        if (this.user) {
            this.router.navigate(['/expenso']);
        }

        return !!this.user;
    }

}

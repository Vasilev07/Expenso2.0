import { Injectable } from '@angular/core';
import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins } from '@capacitor/core';
import { IFbUser } from '../interfaces/user-fb.interface';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class UsersFbService {
    public fbLogin: FacebookLoginPlugin;
    public user: IFbUser;
    public url: string;
    public token;
    private baseUrl: string= 'https://graph.facebook.com/';

    public constructor(private readonly storageService: StorageService) {

    }

    public async setupFbLogin(): Promise<void> {
        const { FacebookLogin } = Plugins;
        this.fbLogin = FacebookLogin as any;
    }

    public async login(): Promise<void> {
        const permissions = ['user_birthday', 'email'];
        const result = await this.fbLogin.login({ permissions });

        if (result.accessToken && result.accessToken.userId) {
            this.token = result.accessToken;
            this.setLoginUrl();
        } else if (result.accessToken && !result.accessToken.userId) {
            await this.getCurrentToken();
        }
    }

    public async logout(): Promise<void> {
        await this.fbLogin.logout();
        this.user = null;
        this.token = null;
    }

    private async getCurrentToken(): Promise<void> {
        const result = await this.fbLogin.getCurrentAccessToken();

        if (result.accessToken) {
            this.token = result.accessToken;
            this.storageService.set('fbToken', `${ result.accessToken.token }`);
            this.setLoginUrl();
        }
    }

    private setLoginUrl(): void {
        this.url
            = `${this.baseUrl}${ this.token.userId }?fields=id,name,picture.width(720),birthday,email&access_token=${ this.token.token }`;
    }
}

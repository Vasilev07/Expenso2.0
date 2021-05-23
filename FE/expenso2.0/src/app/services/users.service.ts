import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FacebookLoginPlugin } from "@capacitor-community/facebook-login";
import { Plugins } from "@capacitor/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public fbLogin: FacebookLoginPlugin;
  public user: IUser;
  public url: string;
  public token;

  public constructor() {
  }

  public async setupFbLogin(): Promise<void> {
    const { FacebookLogin } = Plugins;
    this.fbLogin = FacebookLogin as any;
    console.log('login is setted up');

  }

  public async login(): Promise<void> {
    console.log('IN LOGIN');

    const permissions = ['user_birthday', 'email'];
    const result = await this.fbLogin.login({ permissions });
    console.log(`result111 ${result}`);

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      console.log('LOADING USERS1');

      this.setLoginUrl();
    } else if (result.accessToken && !result.accessToken.userId) {
      console.log('LOADING USERS2');
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
    console.log('getCurrentToken!!!!!!!!!!!!!!!!!!', result);

    if (result.accessToken) {
      this.token = result.accessToken;
      this.setLoginUrl();
    }
  }

  private setLoginUrl(): void {
    this.url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
    console.log(this.url);

  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FacebookLoginPlugin } from "@capacitor-community/facebook-login";
import { Plugins } from "@capacitor/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public fbLogin: FacebookLoginPlugin;
  public user: IUser;
  public token;

  public constructor(
                     private readonly http: HttpClient) {
    this.setupFbLogin();
  }

  public async setupFbLogin(): Promise<void> {
    const { FacebookLogin } = Plugins;
    this.fbLogin = FacebookLogin as any;
  }

  public async login(): Promise<void> {
    const permissions = ['user_birthday', 'email'];
    const result = await this.fbLogin.login({ permissions });
    console.log(`result ${result}`);

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      this.loadUserData();
    } else if (result.accessToken && !result.accessToken.userId) {
      this.getCurrentToken();
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
      this.loadUserData();
    }
  }

  private async loadUserData(): Promise<void> {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`
    this.http.get(url).subscribe((res: any) => {
      console.log(`result ${JSON.stringify(res)}`);
      console.log(res.picture);

      this.user = {
        id: res.id,
        name: res.name,
        pictureUrl: res.picture.data.url,
        birthday: res.birthday,
        email: res.email
      };

      console.log(this.user);
    });
  }
}

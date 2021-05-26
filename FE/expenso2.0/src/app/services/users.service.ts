import { Injectable } from "@angular/core";
import { FacebookLoginPlugin } from "@capacitor-community/facebook-login";
import { Plugins } from "@capacitor/core";
import { IUser } from "../interfaces/user.interface";
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public fbLogin: FacebookLoginPlugin;
  public user: IUser;
  public url: string;
  public token;

  public constructor(private readonly storage: Storage) {
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
      await this.storage.set("fbToken", `${result.accessToken.token}`);
      this.setLoginUrl();
    }
  }

  private setLoginUrl(): void {
    this.url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
  }
}

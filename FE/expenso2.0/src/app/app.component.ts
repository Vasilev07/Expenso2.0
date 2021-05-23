import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';

registerWebPlugin(FacebookLogin as any);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public readonly slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  public shouldShow: boolean = true;
  public fbLogin: FacebookLoginPlugin;
  public user;
  public token;

  public constructor(private readonly router: Router,private readonly http: HttpClient) {
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
    } else if(result.accessToken && !result.accessToken.userId) {
      this.getCurrentToken();
    }
  }

  public async getCurrentToken(): Promise<void> {
    const result = await this.fbLogin.getCurrentAccessToken();

    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    }
  }

  public async loadUserData(): Promise<void> {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`
    this.http.get(url).subscribe(res => {
      console.log(`result ${res}`);
      this.user = res
    });
  }

  public async logout(): Promise<void> {
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }

  public onContinue(): void {
    this.shouldShow = false;
    this.router.navigate(['/tabs/spendings']);
  }
}

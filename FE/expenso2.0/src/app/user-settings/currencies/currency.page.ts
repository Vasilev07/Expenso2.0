import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss']
})
export class CurrencyPage implements OnInit {
  public currencies: any;

  constructor(private readonly http: HttpClient,
              private readonly navCtrl: NavController) {
  }

  public ngOnInit(): void {
    this.http.get('http://openexchangerates.org/api/currencies.json').subscribe((currencies) => {
      this.currencies = Object.entries(currencies).map((currency) => {
        return {
          currency: currency[0],
          name: currency[1]
        };
      });

      console.log(this.currencies);

    });
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }
}

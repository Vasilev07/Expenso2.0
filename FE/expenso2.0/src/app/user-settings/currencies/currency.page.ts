import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserSettingsService } from "../services/user-settings.service";

@Component({
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss']
})
export class CurrencyPage implements OnInit {
  public currencies: any;
  public filteredData: any;

  constructor(private readonly http: HttpClient,
              private readonly navCtrl: NavController,
              private readonly usersSettingsService: UserSettingsService) {
  }

  public ngOnInit(): void {
    this.http.get('http://openexchangerates.org/api/currencies.json').subscribe((currencies) => {
      this.currencies = Object.entries(currencies).map((currency) => {
        return {
          currency: currency[0],
          name: currency[1]
        };
      });
      this.filteredData = this.currencies;
    });
  }

  public onCurrencySelect(currency): void {
    this.usersSettingsService.settings.next(currency);

    this.onCancelClick();
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }

  public onSearchTriggered(event): void {
    console.log(event);
    const searchTerm = event.detail.value;

    console.log(this.filteredData);

    this.filteredData = this.currencies.filter((currency) => {
      return currency.name.toLowerCase().includes(searchTerm)
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss']
})
export class CurrencyPage implements OnInit {
  public currencies: any;

  constructor(private readonly http: HttpClient) {
  }

  public ngOnInit(): void {
    this.http.get('http://openexchangerates.org/api/currencies.json').subscribe((currencies) => {
      this.currencies = Object.entries(currencies).map((currency) => {
        return {
          symbol: currency[0],
          name: currency[1]
        };
      });
    });
  }
}

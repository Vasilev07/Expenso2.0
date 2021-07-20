import { HttpClient } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { of } from "rxjs";
import { UserSettingsService } from "../services/user-settings.service";
import { CurrencyPage } from "./currency.page";

const currencies = {
    BGN: 'Bulgarian Lev',
    USD: 'United States Dollar'
};

describe('CurrencyPage', () => {
    let sut: CurrencyPage;
    let http: HttpClient;
    let navCtrl: NavController;
    let usersSettingsService: UserSettingsService;

    beforeEach(() => {
        http = {
            get: jest.fn(() => of(currencies))
        } as any;

        usersSettingsService = {
            settings: {
                next: jest.fn()
            }
        } as any;

        navCtrl = {
            back: jest.fn()
        } as any;

        sut = new CurrencyPage(http, navCtrl, usersSettingsService);
    });

    describe('ngOnInit()', () => {
        it('should set currencies and filteredCurrencies', () => {
            sut.ngOnInit();

            expect(sut.currencies).toStrictEqual([
                {
                    name: 'Bulgarian Lev',
                    currency: 'BGN'
                },
                {
                    name: 'United States Dollar',
                    currency: 'USD'
                }
            ]);
            expect(sut.filteredData).toStrictEqual(sut.currencies);
        });
    });

    describe('onCurrencySelect()', () => {
        it('should call next on usersSettingsService.settings and onCancelClick()', () => {
            sut.onCancelClick = jest.fn();

            sut.onCurrencySelect({});

            expect(usersSettingsService.settings.next).toHaveBeenCalled();
            expect(sut.onCancelClick).toHaveBeenCalled();
        });
    });

    describe('onCancelClick()', () => {
        it('should call navCtrl.back', () => {
            sut.onCancelClick();

            expect(navCtrl.back).toHaveBeenCalled();
        });
    });

    describe('onSearchTriggered()', () => {
        it('should set filteredData', () => {
            const event = {
                detail: {
                    value: 'b'
                }
            } as any;
            sut.currencies = [
                {
                    name: 'Bulgarian Lev',
                    currency: 'BGN'
                },
                {
                    name: 'United States Dollar',
                    currency: 'USD'
                }
            ];

            sut.onSearchTriggered(event);

            expect(sut.filteredData).toStrictEqual([{
                name: 'Bulgarian Lev',
                currency: 'BGN'
            }]);
        });
    });
});

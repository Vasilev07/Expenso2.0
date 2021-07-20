import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { IUserDetails } from "../interfaces/user.interface";
import { ThemeService } from "../services/theme.service";
import { UserSettingsService } from "./services/user-settings.service";
import { UserSettingsPage } from "./user-settings.page";

const users = [
    {
        "email": "a",
        "id": "60b3f2c0ae329307380afd58",
        "darkMode": false,
        "currency": "BGN"
    }
];

describe('UserSettingsPage', () => {
    let sut: UserSettingsPage;
    let store: Store<{ user: IUserDetails }>;
    let themeService: ThemeService;
    let navCtrl: NavController;
    let router: Router;
    let usersSettingsService: UserSettingsService;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(users)),
            dispatch: jest.fn()
        } as any;

        usersSettingsService = {
            settings: {
                next: jest.fn(),
                subscribe: jest.fn()
            }
        } as any;

        navCtrl = {
            back: jest.fn()
        } as any;

        themeService = {
            enableDarkMode: jest.fn(),
            enableLightMode: jest.fn()
        } as any;

        router = {
            navigate: jest.fn()
        } as any;

        sut = new UserSettingsPage(store, themeService, navCtrl, router, usersSettingsService);
    });

    describe('ngOnInit()', () => {
        it('should set userPrefferences, darkMode and currency', () => {
            sut.ngOnInit();

            expect(sut.userPrefferences).toStrictEqual(users[0]);
            expect(sut.darkMode).toStrictEqual(users[0].darkMode);
            expect(sut.currency).toStrictEqual(users[0].currency);
        });
    });

    describe('onDarkModeChange()', () => {
        it('should call enableDarkMode when event is thruthy', () => {
            sut.enableDarkMode = jest.fn();

            sut.onDarkModeChange({});

            expect(sut.enableDarkMode).toHaveBeenCalled();
        });

        it('should call enableLightMode when event is thruthy', () => {
            sut.enableLightMode = jest.fn();

            sut.onDarkModeChange(null);

            expect(sut.enableLightMode).toHaveBeenCalled();
        });
    });

    describe('enableDarkMode()', () => {
        it('should set darkMode to true and call themeService.enableDarkMode()', () => {
            sut.enableDarkMode();

            expect(sut.darkMode).toBe(true);
            expect(themeService.enableDarkMode).toHaveBeenCalled();
        });
    });

    describe('enableLightMode()', () => {
        it('should set darkMode to true and call themeService.enableDarkMode()', () => {
            sut.enableLightMode();

            expect(sut.darkMode).toBe(false);
            expect(themeService.enableLightMode).toHaveBeenCalled();
        });
    });

    describe('onSaveClick()', () => {
        it('should call dispatch and onCancelClick', () => {
            sut.onCancelClick = jest.fn();

            sut.onSaveClick();

            expect(store.dispatch).toHaveBeenCalled();
            expect(sut.onCancelClick).toHaveBeenCalled();
        });
    });

    describe('onCancelClick()', () => {
        it('should call navCtrl.back', () => {
            sut.onCancelClick();

            expect(navCtrl.back).toHaveBeenCalled();
        });
    });

    describe('onCurrencySelect()', () => {
        it('should call navigate', () => {
            sut.onCurrencySelect();

            expect(router.navigate).toHaveBeenCalled();
        });
    });
});

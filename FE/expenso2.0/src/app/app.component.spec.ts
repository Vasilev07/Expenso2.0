import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { UsersFbService } from './services/users-fb.service';

const user = [
    {
        email: "a",
        _id: "60b3f2c0ae329307380afd58",
        darkMode: false,
        currency: "BGN"
    }
];

describe('AppComponent', () => {
    let sut: Partial<AppComponent>;
    let store: Store<{ user: unknown }>;
    let userFBService: UsersFbService;
    let themeService: ThemeService;
    let router: Router;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(user)),
            dispatch: jest.fn()
        } as any;
        userFBService = {
            setupFbLogin: jest.fn()
        } as any;
        themeService = {
            enableDarkMode: jest.fn(),
            enableLightMode: jest.fn()
        } as any;
        router = {
            navigate: jest.fn()
        } as any;

        sut = new AppComponent(userFBService, router, store, themeService);
    });

    describe('ngOnInit()', () => {
        it('should call dispatch and select', (done) => {
            sut.ngOnInit();

            expect(store.dispatch).toHaveBeenCalled();
            expect(store.select).toHaveBeenCalled();

            done();
        });

        it('should set user', (done) => {
            sut.ngOnInit();

            expect(sut.user).toStrictEqual(user[0]);

            done();
        });

        it('should call themeService.enableLightMode when user has darkMode property set to false', (done) => {
            sut.ngOnInit();

            expect(themeService.enableLightMode).toHaveBeenCalled()

            done();
        });
    });

    describe('afterViewInit()', () => {
        it('should call navigate when user present', () => {
            sut.user = user[0] as any;

            sut.afterViewInit();

            expect(router.navigate).toHaveBeenCalled();
        });

        it('should NOT call navigate when user is not present', () => {
            sut.afterViewInit();

            expect(router.navigate).not.toHaveBeenCalled();
        });
    });

    describe('onFbLogin()', () => {
        it('should call dispatch', () => {
            sut.onFbLogin();

            expect(store.dispatch).toHaveBeenCalled();
        });
    });

    describe('onLogin()', () => {
        it('should call dispatch', () => {
            sut.onLogin();

            expect(store.dispatch).toHaveBeenCalled();
        });
    });
});

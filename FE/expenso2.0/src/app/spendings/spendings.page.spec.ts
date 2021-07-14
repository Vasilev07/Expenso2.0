import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SpendingsPage } from './spendings.page';

const spendings = [
    {
        _id: "60b940def76f1130c8f19ceb",
        expenses: 200,
        name: "Bike",
        icon: "bicycle-outline",
        date: "Mon Jul 12 2021 23:10:50 GMT+0300 (Eastern European Summer Time)",
        balance: 700,
        color: "#59e433",
        totalIncomes: 1200,
        expencePercent: 16.66,
    }
];

const user = [
    {
        email: "a",
        _id: "60b3f2c0ae329307380afd58",
        darkMode: false,
        currency: "BGN"
    }
];

describe('SpendingsPage', () => {
    let sut: Partial<SpendingsPage>;
    let router: Router;
    let store: Store<{ spendings: [], user: [] }>;

    beforeEach(() => {
        router = {
            navigate: jest.fn()
        } as any;
        store = {
            dispatch: jest.fn(),
            select: jest.fn((param) => {
                return param === 'spendings' ?
                    of(spendings) :
                    of(user);
            })
        } as any;

        sut = new SpendingsPage(router, store);
    });

    describe('ngOnInit()', () => {
        it('should call all store selectors and dispatchs', () => {
            sut.ngOnInit();

            expect(store.dispatch).toHaveBeenCalled();
            expect(store.select).toHaveBeenCalledTimes(2);
        });

        it('should set spendings and filtered spendings', (done) => {
            sut.ngOnInit();

            expect(sut.spendings).toStrictEqual(spendings);
            expect(sut.filteredSpendings).toStrictEqual(spendings);
            done();
        });

        it('should set user', (done) => {
            sut.ngOnInit();

            expect(sut.user).toStrictEqual(user[0]);
            done();
        });
    });

    describe('onTransactionClick()', () => {
        it('should call router navigate', () => {
            sut.onTransactionClick('expense');

            expect(router.navigate).toBeCalledTimes(1);
        });
    });

    describe('onUserSettingsClick()', () => {
        it('should call router navigate', () => {
            sut.onUserSettingsClick();

            expect(router.navigate).toBeCalledTimes(1);
        });
    });

    describe('onDateChanged()', () => {
        it('should call router navigate', () => {
            sut.onDateChanged();

            expect(store.dispatch).toBeCalledTimes(1);
        });
    });
});

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SpendingsPage } from './spendings.page';

describe('SpendingsPage', () => {
    let sut: Partial<SpendingsPage>;
    let router: Router;
    let store: Store<{ spendings: [], user: [] }>;

    beforeEach(() => {
        router = {} as Router;
        store = {
            dispatch: jest.fn(),
            select: jest.fn(() => of())
        } as any;

        sut = new SpendingsPage(router, store);
    });

    describe('ngOnInit()', () => {
        it('should call all store selectors and dispatchs', () => {
            sut.ngOnInit();

            expect(store.dispatch).toHaveBeenCalled();
            expect(store.select).toHaveBeenCalledTimes(2);
        });
    })
});

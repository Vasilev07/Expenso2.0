import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { CategoriesPage } from "./categories.page";

const categories = [
    {
        _id: '123',
        name: 'Test',
        color: 'red',
        icon: 'cool one',
        isExpense: true
    },
    {
        _id: '1234',
        name: 'Test2',
        color: 'red 2',
        icon: 'cool one 2',
        isExpense: false
    }
];

describe('CategoriesPage', () => {
    let sut: CategoriesPage;
    let store: Store<{ categories: [] }>;
    let router: Router;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(categories)),
            dispatch: jest.fn()
        } as any;
        router = {
            navigate: jest.fn()
        } as any;

        sut = new CategoriesPage(store, router);
    });

    describe('ngOnInit()', () => {
        it('should set categories to store ones', () => {
            sut.ngOnInit();

            expect(sut.categories).toStrictEqual(categories);
        });

        it('should set filteredCategories and filteredData to expenses when isExpense is true', () => {
            sut.isExpense = true;

            sut.ngOnInit();

            expect(sut.filteredCategories).toStrictEqual([categories[0]]);
            expect(sut.filteredData).toStrictEqual([categories[0]]);
        });

        it('should set filteredCategories and filteredData to incomes when isExpense is false', () => {
            sut.isExpense = false;

            sut.ngOnInit();

            expect(sut.filteredCategories).toStrictEqual([categories[1]]);
            expect(sut.filteredData).toStrictEqual([categories[1]]);
        });
    });

    describe('addNewCategory', () => {
        it('should call navigate to given route', () => {
            sut.addNewCategory();

            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('expenseToggleSwitched()', () => {
        it('should set isExpense to true when event.detail.value is equal to expense', () => {
            const event = {
                detail: {
                    value: 'expense'
                }
            };
            (sut as any).filterCategoriesOnTypChange = jest.fn();

            sut.expenseToggleSwitched(event as any);

            expect(sut.isExpense).toBe(true);
        });

        it('should set isExpense to true when event.detail.value is equal to expense', () => {
            const event = {
                detail: {
                    value: 'income'
                }
            };
            (sut as any).filterCategoriesOnTypChange = jest.fn();

            sut.expenseToggleSwitched(event as any);

            expect(sut.isExpense).toBe(false);
        });
    });
});

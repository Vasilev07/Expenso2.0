import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { CategorySelectorService } from "./category-selector/category-selected.service";
import { TransactionPage } from "./transaction.page";

const category = {
    _id: 'string',
    name: 'string',
    color: 'string',
    icon: 'string',
    isExpense: 'boolean',
};

describe('TransactionPage', () => {
    let sut: TransactionPage;
    let router: Router;
    let categorySelectorService: CategorySelectorService;
    let navCtrl: NavController;
    let store: Store;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        store = {
            dispatch: jest.fn()
        } as any;
        activatedRoute = {
            snapshot: {
                queryParams: {
                    isExpense: true
                }
            }
        } as any;

        categorySelectorService = {
            categorySelected: of(category),
        } as any;

        navCtrl = {
            back: jest.fn()
        } as any;

        router = {
            navigate: jest.fn()
        } as any;

        sut = new TransactionPage(router, categorySelectorService, navCtrl, store, activatedRoute);
    });

    describe('ngOnInit()', () => {
        it('should set isExpense, expenseSelector and selectedCategory', () => {
            sut.ngOnInit();


            expect(sut.isExpense).toStrictEqual(false);
            expect(sut.expenseSelector).toStrictEqual('income');
            expect(sut.selectedCategory).toStrictEqual(category);
        });
    });

    describe('expenseToggleSwitched', () => {
        it('should set isEpense to false when passed value is income', () => {
            const event = {
                detail: {
                    value: 'income'
                }
            };

            sut.expenseToggleSwitched(event as any);

            expect(sut.isExpense).toBe(false);
        });

        it('should set isEpense to true when passed value is expense', () => {
            const event = {
                detail: {
                    value: 'expense'
                }
            };

            sut.expenseToggleSwitched(event as any);

            expect(sut.isExpense).toBe(true);
        });
    });

    describe('onCategorySelect()', () => {
        it('should call router.navigate', () => {
            sut.onCategorySelect();

            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('onSaveClick()', () => {
        it('should call next on usersSettingsService.settings and onCancelClick()', () => {
            sut.ngOnInit();
            sut.onSaveClick();

            expect(store.dispatch).toHaveBeenCalled();
            expect(navCtrl.back).toHaveBeenCalled();
        });
    });

    describe('onCancelClick()', () => {
        it('should call navCtrl.back', () => {
            sut.onCancelClick();

            expect(navCtrl.back).toHaveBeenCalled();
        });
    });
});

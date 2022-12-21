import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TransactionEditPage } from './transaction-edit.page';

const transactions = [
    {
        "_id": "60eca1b2a0326ffad527ed5a",
        "date": "7-2021",
        "userId": "60b3f2c0ae329307380afd58",
        "incomes": [
            {
                "_id": "60eca1b01d54732900f5f5aa",
                "date": "Mon Jul 12 2021 23:10:16 GMT+0300 (Eastern European Summer Time)",
                "amount": 1000,
                "category": {
                    "categoryId": "60b9416be1b5af4414cc908b",
                    "name": "Salary",
                    "icon": "cash-outline",
                    "color": "#33e436"
                }
            },
            {
                "_id": "60eca2011d54732900f5f5af",
                "date": "Mon Jul 12 2021 23:11:35 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b9416be1b5af4414cc908b",
                    "name": "Salary",
                    "icon": "cash-outline",
                    "color": "#33e436"
                }
            },
            {
                "_id": "60ecae216254f842d4018dda",
                "date": "Tue Jul 13 2021 00:03:20 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b9416be1b5af4414cc908b",
                    "name": "Salary",
                    "icon": "cash-outline",
                    "color": "#33e436"
                }
            }
        ],
        "expenses": [
            {
                "_id": "60eca1c51d54732900f5f5ab",
                "date": "Mon Jul 12 2021 23:10:39 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b940d4f76f1130c8f19cea",
                    "name": "Sport",
                    "icon": "american-football-outline",
                    "color": "#e433b4"
                }
            },
            {
                "_id": "60eca1ce1d54732900f5f5ac",
                "date": "Mon Jul 12 2021 23:10:50 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b940def76f1130c8f19ceb",
                    "name": "Bike",
                    "icon": "bicycle-outline",
                    "color": "#59e433"
                }
            },
            {
                "_id": "60eca1d71d54732900f5f5ad",
                "date": "Mon Jul 12 2021 23:10:57 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b940b9f76f1130c8f19ce8",
                    "name": "Home",
                    "icon": "hammer-outline",
                    "color": "#e433f3"
                }
            },
            {
                "_id": "60eca1e31d54732900f5f5ae",
                "date": "Mon Jul 12 2021 23:11:09 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b940def76f1130c8f19ceb",
                    "name": "Bike",
                    "icon": "bicycle-outline",
                    "color": "#59e433"
                }
            },
            {
                "_id": "60eca22b1d54732900f5f5b0",
                "date": "Mon Jul 12 2021 23:12:23 GMT+0300 (Eastern European Summer Time)",
                "amount": 100,
                "category": {
                    "categoryId": "60b940c7f76f1130c8f19ce9",
                    "name": "Food",
                    "icon": "fast-food-outline",
                    "color": "#337ae4"
                }
            }
        ]
    }
];

describe('TransactionEditPage', () => {
    let sut: TransactionEditPage;
    let store: Store<{ transactions: [] }>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let navCtrl: NavController;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(transactions) as any),
            dispatch: jest.fn()
        } as any;

        activatedRoute = {
            snapshot: {
                params: {
                    transactionId: '60eca1b2a0326ffad527ed5a',
                    currentTransactionId: '60ecae216254f842d4018dda'
                }
            }
        } as any;

        router = {
            navigate: jest.fn()
        } as any;

        navCtrl = {
            back: jest.fn()
        } as any;

        sut = new TransactionEditPage(store, router, activatedRoute, navCtrl);
    });

    describe('ngOnInit()', () => {
        it('should set transactionId and currentTransactionId comming from activatedRoute snapshot', () => {
            sut.ngOnInit();

            expect(sut.transactionId).toStrictEqual('60eca1b2a0326ffad527ed5a');
            expect(sut.currentTransactionId).toStrictEqual('60ecae216254f842d4018dda');
        });

        it('should set foundTransaction, expenseSelector, date, amount and selectedCategory', () => {
            sut.ngOnInit();

            expect(sut.foundTransaction).toStrictEqual({
                amount: 100,
                _id: '60ecae216254f842d4018dda',
                category: {
                    categoryId: '60b9416be1b5af4414cc908b',
                    color: '#33e436',
                    icon: 'cash-outline',
                    name: 'Salary',
                },
                date: 'Tue Jul 13 2021 00:03:20 GMT+0300 (Eastern European Summer Time)',
                isExpense: false
            });
            expect(sut.expenseSelector).toStrictEqual('income');
            expect(sut.date).toStrictEqual('Tue Jul 13 2021 00:03:20 GMT+0300 (Eastern European Summer Time)');
            expect(sut.amount).toStrictEqual(100);
            expect(sut.selectedCategory).toStrictEqual({
                categoryId: '60b9416be1b5af4414cc908b',
                color: '#33e436',
                icon: 'cash-outline',
                name: 'Salary'
            });
        });
    });

    describe('expenseToggleSwitched()', () => {
        it('should set isExpense to true when value is expense and selector to expense', () => {
            const event = {
                detail: {
                    value: 'expense'
                }
            }

            sut.expenseToggleSwitched(event);

            expect(sut.isExpense).toStrictEqual(true);
            expect(sut.expenseSelector).toStrictEqual('expense');
        });

        it('should set isExpense to false when value is expense and selector to income', () => {
            const event = {
                detail: {
                    value: 'income'
                }
            }

            sut.expenseToggleSwitched(event);

            expect(sut.isExpense).toStrictEqual(false);
            expect(sut.expenseSelector).toStrictEqual('income');
        });
    });

    describe('onCancelClick()', () => {
        it('should call router navigate', () => {
            sut.onCancelClick();

            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('onSaveClick()', () => {
        it('should call dispatch and nav back()', () => {
            sut.onSaveClick();

            expect(store.dispatch).toHaveBeenCalled();
            expect(navCtrl.back).toHaveBeenCalled();
        });
    });
});

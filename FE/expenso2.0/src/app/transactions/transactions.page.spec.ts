import { Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { TransactionsPage } from "./transactions.page";

const transactions = [
    {
        date: "7-2021",
        userId: "60b3f2c0ae329307380afd58",
        _id: "60eca1b2a0326ffad527ed5a",
        incomes: [
            {
                amount: 1000,
                category: {
                    categoryId: "60b9416be1b5af4414cc908b",
                    color: "#33e436",
                    icon: "cash-outline",
                    name: "Salary",
                },
                date: "Mon Jul 12 2021 23:10:16 GMT+0300 (Eastern European Summer Time)",
                _id: "60eca1b01d54732900f5f5aa"
            },
        ],
        expenses: [
            {
                amount: 1000,
                category: {
                    categoryId: "60b9416be1b5af4414cc908b",
                    color: "#33e436",
                    icon: "cash-outline",
                    name: "Salary",
                },
                date: "Mon Jul 12 2021 23:10:16 GMT+0300 (Eastern European Summer Time)",
                _id: "60eca1b01d54732900f5f5aa"
            },
        ],
    }
];

describe('TransactionsPage', () => {
    let sut: TransactionsPage;
    let store: Store<{ transactions: [], user: [] }>;
    let router: Router;
    let actionSheetController: ActionSheetController;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(transactions)),
            dispatch: jest.fn()
        } as any;
        router = {
            navigate: jest.fn()
        } as any;
        actionSheetController = {
            create: jest.fn()
        } as any;

        sut = new TransactionsPage(store, router, actionSheetController);
    });

    describe('ngOnInit()', () => {
        it('should set first transaction', () => {
            sut.ngOnInit();

            expect(sut.transactions).toStrictEqual(transactions[0])
        });

        it('should set mergedTransactions', () => {
            sut.ngOnInit();

            expect(sut.mergedTransactions).toBeDefined();
        });

        it('should set filteredData to mergedTransactions', () => {
            sut.ngOnInit();

            expect(sut.filteredData).toStrictEqual(sut.mergedTransactions);
        });
    });

    describe('onTransactionEdit()', () => {
        it('should call router.navigate', () => {
            sut.onTransactionEdit({});

            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('onDeleteTransaction()', () => {
        it('should call store.dispatch', () => {
            sut.onDeleteTransaction({});

            expect(store.dispatch).toHaveBeenCalled();
        });
    });

    describe('onSearchTriggered()', () => {
        it('should set filteredData if searchTerm match', () => {
            const searchTerm = {
                detail: {
                    value: 'Salary'
                }
            };
            sut.mergedTransactions = [transactions[0].incomes[0]];


            sut.onSearchTriggered(searchTerm);

            expect(sut.filteredData).toBeDefined();
        });
    });
});

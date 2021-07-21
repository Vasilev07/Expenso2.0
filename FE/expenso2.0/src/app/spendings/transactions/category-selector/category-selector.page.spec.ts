import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { CategorySelectorService } from "./category-selected.service";
import { CategorySelectorPage } from "./category-selector.page";


const category = [
    {
        _id: 'string',
        name: 'string',
        color: 'string',
        icon: 'string',
        isExpense: true,
    },
    {
        _id: 'string',
        name: 'string',
        color: 'string',
        icon: 'string',
        isExpense: false,
    }
];

describe('CategorySelectorPage', () => {
    let sut: CategorySelectorPage;
    let store: Store<{ categories: [] }>
    let activatedRoute: ActivatedRoute;
    let navCtrl: NavController;
    let categorySelectorService: CategorySelectorService;

    beforeEach(() => {
        store = {
            select: jest.fn(() => of(category))
        } as any;

        activatedRoute = {
            snapshot: {
                queryParams: {
                    isExpense: 'true'
                }
            }
        } as any;

        categorySelectorService = {
            categorySelected: {
                next: jest.fn()
            },
        } as any;

        navCtrl = {
            back: jest.fn()
        } as any;

        sut = new CategorySelectorPage(store, activatedRoute, navCtrl, categorySelectorService);
    });

    describe('ngOnInit()', () => {
        it('should set isExpense, and filteredCategories based on isExpense', () => {
            sut.ngOnInit();

            expect(sut.isExpense).toStrictEqual(true);
            expect(sut.filteredCategories).toStrictEqual([category[0]]);
        });
    });


    describe('onCategorySelected()', () => {
        it('should call router.navigate', () => {
            sut.onCategorySelected({} as any);

            expect(categorySelectorService.categorySelected.next).toHaveBeenCalled();
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

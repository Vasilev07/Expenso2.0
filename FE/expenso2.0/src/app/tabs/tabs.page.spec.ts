import { Store } from "@ngrx/store";
import { TabsPage } from "./tabs.page";

describe('TabsPage', () => {
    let sut: Partial<TabsPage>;
    let store: Store;

    beforeEach(() => {
        store = {
            dispatch: jest.fn(),
        } as any;

        sut = new TabsPage(store);
    });

    describe('ngOnInit()', () => {
        it('should call store.discpatch', () => {
            sut.ngOnInit();

            expect(store.dispatch).toHaveBeenCalled();
        });
    });
});

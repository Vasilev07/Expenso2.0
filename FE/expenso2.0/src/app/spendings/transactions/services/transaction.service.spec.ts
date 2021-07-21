import { HttpClient } from "@angular/common/http";
import { TransactionService } from "./transaction.service";

describe('TransactionService', () => {
    let sut: TransactionService;
    let httpClient: HttpClient;

    beforeEach(() => {
        httpClient = {
            post: jest.fn(),
            get: jest.fn(),
            delete: jest.fn()
        } as any;

        sut = new TransactionService(httpClient);
    });

    describe('addNew()', () => {
        it('should call post', () => {
            sut.addNew({} as any);


            expect(httpClient.post).toHaveBeenCalled();
        });
    });

    describe('getAllSpendings()', () => {
        it('should call get', () => {
            sut.getAllSpendings({} as any);


            expect(httpClient.get).toHaveBeenCalled();
        });
    });

    describe('getAllTransactions()', () => {
        it('should call get', () => {
            sut.getAllTransactions();


            expect(httpClient.get).toHaveBeenCalled();
        });
    });

    describe('edit()', () => {
        it('should call post', () => {
            sut.edit({} as any, '', '');

            expect(httpClient.post).toHaveBeenCalled();
        });
    });

    describe('delete()', () => {
        it('should call navCtrl.back', () => {
            sut.delete('', '', true);

            expect(httpClient.delete).toHaveBeenCalled();
        });
    });
});

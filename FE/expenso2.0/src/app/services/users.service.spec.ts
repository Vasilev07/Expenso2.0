import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { UsersService } from "./users.service";

describe('UsersService', () => {
    let sut: UsersService;
    let httpService: HttpClient;
    let storageService: StorageService;

    beforeEach(() => {
        httpService = {
            post: jest.fn()
        } as any;
        storageService = {
            set: jest.fn(),
            get: jest.fn()
        } as any;

        sut = new UsersService(httpService, storageService, {} as any);
    });

    describe('login()', () => {
        it('should call post', () => {
            sut.login({} as any);

            expect(httpService.post).toHaveBeenCalled();
        });
    });

    describe('storeToken()', () => {
        it('should call set', () => {
            sut.storeToken({} as any);

            expect(storageService.set).toHaveBeenCalled();
        });
    });

    describe('getToken()', () => {
        it('should call set', () => {
            sut.getToken();

            expect(storageService.get).toHaveBeenCalled();
        });
    });

    describe('updateUserPreferences()', () => {
        it('should call post', () => {
            sut.updateUserPreferences({} as any);

            expect(httpService.post).toHaveBeenCalled();
        });
    });

});

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../interfaces/transaction.interface';
import { BASE_PATH } from '../../../app-configuration.constants';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseUrl: string;

    public constructor(private readonly httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string) {
        this.baseUrl = basePath ? basePath : 'http://0.0.0.0:8080';
    }

    public addNew(transaction: ITransaction): Observable<ITransaction> {
        return this.httpClient.post<ITransaction>(`${ this.baseUrl }/transaction`, transaction);
    }

    public getAllSpendings(date: string, wholeYearSelected: boolean): Observable<ITransaction[]> {
        return this.httpClient.get<ITransaction[]>(
            `${ this.baseUrl }/transaction/spendings/${ date }/?wholeYearSelected=${ wholeYearSelected }`
        );
    }

    public getAllTransactions(): Observable<ITransaction[]> {
        return this.httpClient.get<ITransaction[]>(`${ this.baseUrl }/transaction`);
    }

    public edit(transaction: ITransaction, transactionId: string, currentTransactionId: string): any {
        return this.httpClient.post<ITransaction>(
            `${ this.baseUrl }/transaction/${ transactionId }/${ currentTransactionId }`,
            transaction
        );
    }

    public delete(transactionId: string, currentTransactionId: string, isExpense: boolean): any {
        return this.httpClient.delete<ITransaction>(
            `${ this.baseUrl }/transaction/${ transactionId }/${ currentTransactionId }/${ isExpense }`
        );
    }
}

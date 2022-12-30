import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../interfaces/transaction.interface';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseUrl: string = 'http://0.0.0.0:8080';

    public constructor(private readonly httpClient: HttpClient) {
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

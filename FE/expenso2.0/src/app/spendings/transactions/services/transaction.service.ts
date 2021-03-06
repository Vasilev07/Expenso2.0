import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITransaction } from "../interfaces/transaction.interface";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    public constructor(private readonly httpClient: HttpClient) {
    }

    public addNew(transaction: ITransaction): Observable<ITransaction> {
        return this.httpClient.post<ITransaction>('http://localhost:3001/transaction', transaction);
    }

    public getAllSpendings(date: string): Observable<ITransaction[]> {
        return this.httpClient.get<ITransaction[]>(`http://localhost:3001/transaction/spendings/${date}`,);
    }

    public getAllTransactions(): Observable<ITransaction[]> {
        return this.httpClient.get<ITransaction[]>('http://localhost:3001/transaction');
    }

    public edit(transaction: ITransaction, transactionId: string, currentTransactionId: string): any {
        return this.httpClient.post<ITransaction>(`http://localhost:3001/transaction/${transactionId}/${currentTransactionId}`, transaction);
    }

    public delete(transactionId: string, currentTransactionId: string, isExpense: boolean): any {
        return this.httpClient.delete<ITransaction>(`http://localhost:3001/transaction/${transactionId}/${currentTransactionId}/${isExpense}`);
    }
}

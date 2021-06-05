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

  public getAll(isExpense: boolean): Observable<ITransaction[]> {
    return isExpense ?
      this.httpClient.get<ITransaction[]>('http://localhost:3001/transaction/expense'):
      this.httpClient.get<ITransaction[]>('http://localhost:3001/transaction/income');
  }
}

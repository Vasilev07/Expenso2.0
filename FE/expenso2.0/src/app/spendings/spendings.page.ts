import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { retrieveTransactions } from './transactions/actions/transaction.action';

@Component({
    selector: 'app-spendings',
    templateUrl: 'spendings.page.html',
    styleUrls: ['spendings.page.scss']
})
export class SpendingsPage implements OnInit {
    public isExpense: boolean;
    public spendings: any;
    public filteredSpendings;
    public date = new Date().toISOString();
    public user: any[];
    public wholeYearSelected: boolean = false;

    public constructor(private readonly router: Router,
        private readonly store: Store<{ spendings: [], user: [] }>) {
    }

    public ngOnInit(): void {
        this.store.dispatch(retrieveTransactions({ date: this.date, wholeYearSelected: false }));

        this.store.select('spendings').subscribe((spendings) => {
            console.log('spendings', spendings);
            this.spendings = spendings;
            this.filteredSpendings = this.spendings;
        });

        this.store.select('user').subscribe((user: any) => {
            this.user = user[0];
        });
    }

    public onTransactionClick(value: string): void {
        this.isExpense = value === "expense";

        this.router.navigate(['/expenso/tabs/spendings/transaction'], { queryParams: { isExpense: this.isExpense } });
    }

    public onUserSettingsClick(): void {
        this.router.navigate(['/user-settings']);
    }

    public onDateChanged(): void {
        const date = new Date(this.date).toISOString()

        this.store.dispatch(retrieveTransactions({ date: date, wholeYearSelected: false }));
    }

    public handleWholeYear(change): void {
        this.wholeYearSelected = change.detail.checked;
        if (this.wholeYearSelected) {
            this.store.dispatch(retrieveTransactions({ date: this.date, wholeYearSelected: true }));
        } else {
            this.store.dispatch(retrieveTransactions({ date: this.date, wholeYearSelected: false }));
        }
    }
}

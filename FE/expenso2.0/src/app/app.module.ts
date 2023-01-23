import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { categoriesReducer } from './categories/reducers/categories.reducer';
import { Facebook } from '@ionic-native/facebook/ngx';
import { userReducer } from './reducers/app.reducer';
import { AppEffect } from './effects/app.effects';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { transactionReducer } from './spendings/transactions/reducers/transaction.reducer';
import { transactionsReducer } from './transactions/reducers/transactions.reducer';
import { BASE_PATH, CONFIGURATION } from './app-configuration.constants';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot(
            {
                categories: categoriesReducer,
                user: userReducer,
                spendings: transactionReducer,
                transactions: transactionsReducer
            }
        ),
        EffectsModule.forRoot([AppEffect]),
        HttpClientModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25 // Retains last 25 states
        }),
        IonicStorageModule.forRoot()
    ],
    providers: [
        Facebook,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        {
            provide: BASE_PATH,
            useFactory: (configuration: any): string => {
                console.log('config', configuration);
                return configuration['api']!;
            },
            deps: [CONFIGURATION]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

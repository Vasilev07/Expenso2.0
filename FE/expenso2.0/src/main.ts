
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CONFIGURATION } from './app/app-configuration.constants';

if (environment.production) {
    enableProdMode();
}

const main: () => Promise<void> = async(): Promise<void> => {
    console.log('HERE');
    const response: Response = await fetch(environment.appConfigFilePath);
    console.log('response', response);

    const configuration = await response.json();
    const providers = [{ provide: CONFIGURATION, useValue: configuration }];;

    try {
        await platformBrowserDynamic(providers).bootstrapModule(AppModule);
    } catch (err) {
        console.log(err)
    }
}

main();

import { Application } from 'express';
import fs from 'fs';

import path from 'path';

export const routesInit = (app: Application, collection: any) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            const controllerModulePath = modulePath.split('\\');
            const controllerName = controllerModulePath[controllerModulePath.length - 1].split('.')[0];
            console.log(controllerName);

            if (collection[controllerName]) {
                console.log(collection[controllerName]);

                route.init(app, collection[controllerName]);
            }
        });
};

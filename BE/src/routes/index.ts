import { Application } from 'express';
import fs from 'fs';

import path from 'path';

export const routesInit = (app: Application, collection: any) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            // eslint-disable-next-line
            const route = require(modulePath);
            const controllerModulePath = modulePath.split(/\\|\//);
            const controllerName = controllerModulePath[controllerModulePath.length - 1].split('.')[0];
            // console.log('route', route);
            // console.log('modulePath', modulePath);
            // console.log('controllerModulePath', controllerModulePath);
            // console.log('controllerName', controllerName);
            // console.log('collectiobnssadasdasdasd', collection);
            if (collection[controllerName]) {
                // console.log('app', app);
                // console.log('collection', collection[controllerName]);

                route.init(app, collection[controllerName]);
            } else {
                console.error(`ROUTES FOR CONTROLLER ${controllerName} WAS INIT`);
            }
        });
};

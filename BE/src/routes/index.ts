import { Application } from 'express';
import fs from 'fs';
import { Db } from 'mongodb';
import path from 'path';

export const routesInit = (app: Application, db: Db) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            route.init(app, db);
        });
}
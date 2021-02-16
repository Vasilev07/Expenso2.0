import { Application } from 'express';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


export const expressInit = (app: Application) => {
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(bodyParser.json());

    app.use('/static', express.static(path.join(__dirname, '../../public')));
};
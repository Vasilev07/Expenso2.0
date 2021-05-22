import { Application } from 'express';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

export const expressInit = (app: Application) => {
    if (typeof app.use !== 'function'
        || typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.use('/static', express.static(path.join(__dirname, '../../public')));
};

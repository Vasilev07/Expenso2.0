#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeploymentServer } from '../lib/deployment-server';
import { DeploymentUi } from '../lib/deployment-ui';

const app = new cdk.App();

const server = new DeploymentServer(app, 'DeploymentStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});

new DeploymentUi(app, 'DeploymentStackPROD', server.uri,
    {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION
        }
    }
);

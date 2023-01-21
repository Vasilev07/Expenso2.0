#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeploymentStack } from '../lib/deployment-stack';
import { DeploymentStackProd } from '../lib/deployment-prod';

const app = new cdk.App();
// new DeploymentStack(app, 'DeploymentStack', {
//     env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
// });

new DeploymentStackProd(app, 'DeploymentStackPROD', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

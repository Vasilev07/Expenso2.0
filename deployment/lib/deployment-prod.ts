import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class DeploymentStackProd extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const buildBucket = s3.Bucket.fromBucketName(
            this,
            'build-bucket',
            'expenso-web-ui-builds',
        );

        const deploymentBucket = s3.Bucket.fromBucketName(
            this,
            'deployment-bucket',
            'expenso-web-ui-prod',
        );

        // buildBucket.grantRead(new iam.AccountRootPrincipal());

        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3deploy.Source.bucket(buildBucket, 'latest/Archive.zip')],
            destinationBucket: deploymentBucket,
            // destinationKeyPrefix: 'web/static', // optional prefix in destination bucket
        });
    }
}

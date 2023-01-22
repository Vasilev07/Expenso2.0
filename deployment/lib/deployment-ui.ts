import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class DeploymentUi extends cdk.Stack {
    constructor(scope: Construct, id: string, serverUri: string, props?: cdk.StackProps) {
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

        // const url = JSON.stringify({ api: serverUri });
        // const fileToAdd = fs.writeFileSync('/tmp/config.json', url);
        // new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        //     sources: [s3deploy.Source.bucket(buildBucket, 'latest/Archive.zip')],
        //     destinationBucket: deploymentBucket,
        //     // destinationKeyPrefix: 'web/static', // optional prefix in destination bucket
        // });
        //
        // const archive = archiver('zip', { zlib: { level: 9 } });
        //
        // const output = fs.createWriteStream('/tmp/config.zip');
        // archive.pipe(output);
        // archive.append(url, { name: 'config.json' });
        // archive.finalize();

        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [
                s3deploy.Source.bucket(buildBucket, 'latest/Archive.zip'),
                s3deploy.Source.jsonData('config', { api: 'serverUri' })
            ],
            destinationBucket: deploymentBucket,
            // destinationKeyPrefix: 'web/static', // optional prefix in destination bucket
        });

    }
}

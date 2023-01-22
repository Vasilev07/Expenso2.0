import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class DeploymentServer extends cdk.Stack {
    public uri: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const executionRolePolicy = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ['*'],
            actions: [
                'ecr:GetAuthorizationToken',
                'ecr:BatchCheckLayerAvailability',
                'ecr:GetDownloadUrlForLayer',
                'ecr:BatchGetImage',
                'logs:CreateLogStream',
                'logs:PutLogEvents'
            ]
        });

        const vpc = new ec2.Vpc(this, 'MyVpc', {
            maxAzs: 2
        });

        const cluster = new ecs.Cluster(this, 'MyCluster', {
            vpc: vpc
        });

        const repository = ecr.Repository.fromRepositoryName(this, 'expenso', 'expenso');

        const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'ApiTaskDefinition', {
            memoryLimitMiB: 1024,
            cpu: 512
        });
        fargateTaskDefinition.addToExecutionRolePolicy(executionRolePolicy);

        const container = fargateTaskDefinition.addContainer('BE', {
            image: ecs.ContainerImage.fromEcrRepository(repository, 'expenso'),
            logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'expenso-log-group', logRetention: 30 })
        });

        container.addPortMappings({
            containerPort: 8080
        });

        // const sg_service = new ec2.SecurityGroup(this, 'MySGService', { vpc: vpc });
        // sg_service.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(3000));

        const service = new ecs.FargateService(this, 'Service', {
            cluster,
            taskDefinition: fargateTaskDefinition,
            desiredCount: 2,
            // assignPublicIp: true
        });

        // const scaling = service.autoScaleTaskCount({ maxCapacity: 6, minCapacity: 2 });
        // scaling.scaleOnCpuUtilization('CpuScaling', {
        //     targetUtilizationPercent: 50,
        //     scaleInCooldown: Duration.seconds(60),
        //     scaleOutCooldown: Duration.seconds(60)
        // });

        const lb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
            vpc,
            internetFacing: true
        });

        const listener = lb.addListener('Listener', {
            port: 80
        });

        listener.addTargets('Target', {
            port: 8080,
            targets: [service],
            healthCheck: { path: '/health' }
        });

        listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');

       this.uri = lb.loadBalancerDnsName;
    }
}


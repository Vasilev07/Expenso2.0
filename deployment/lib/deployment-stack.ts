import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
// import * as ecsPatterns 'aws-cdk-lib/aws_ecs_patterns';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Duration } from 'aws-cdk-lib';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

// declare

export class DeploymentStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // const executionRolePolicy = new iam.PolicyStatement({
        //     effect: iam.Effect.ALLOW,
        //     resources: ['*'],
        //     actions: [
        //         'ecr:GetAuthorizationToken',
        //         'ecr:BatchCheckLayerAvailability',
        //         'ecr:GetDownloadUrlForLayer',
        //         'ecr:BatchGetImage',
        //         'logs:CreateLogStream',
        //         'logs:PutLogEvents'
        //     ]
        // });

        // const vpc = new ec2.Vpc(this, 'MyVpc', {
        //     maxAzs: 3
        // });

        // const cluster = new ecs.Cluster(this, 'MyCluster', {
        //     vpc: vpc
        // });


        // const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'ApiTaskDefinition', {
        //     memoryLimitMiB: 512,
        //     cpu: 256
        // });
        // fargateTaskDefinition.addToExecutionRolePolicy(executionRolePolicy);

        // const container = fargateTaskDefinition.addContainer('BE', {
        //    image: ecs.ContainerImage.fromEcrRepository(repository, "expenso")
        // });

        // container.addPortMappings({
        //     containerPort: 3000
        // });

        // const sg_service = new ec2.SecurityGroup(this, 'MySGService', { vpc: vpc });
        // sg_service.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(3000));

        // const service = new ecs.FargateService(this, 'Service', {
        //     cluster,
        //     taskDefinition: fargateTaskDefinition,
        //     desiredCount: 2,
        //     assignPublicIp: false
        // });

        // const scaling = service.autoScaleTaskCount({ maxCapacity: 6, minCapacity: 2 });
        // scaling.scaleOnCpuUtilization('CpuScaling', {
        //     targetUtilizationPercent: 50,
        //     scaleInCooldown: Duration.seconds(60),
        //     scaleOutCooldown: Duration.seconds(60)
        // });

        // const lb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
        //     vpc,
        //     internetFacing: true
        // });

        // const listener = lb.addListener('Listener', {
        //     port: 80,
        // });

        // listener.addTargets('Target', {
        //     port: 80,
        //     targets: [service],
        //     healthCheck: { path: '/health/' }
        // });

        // listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');
        const cluster: ecs.Cluster = new ecs.Cluster(this, 'MyCustomCluster');

        const repository = ecr.Repository.fromRepositoryName(this, 'expenso', 'expenso');

        const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
            cluster,
            memoryLimitMiB: 1024,
            desiredCount: 1,
            cpu: 512,
            taskImageOptions: {
                image: ecs.ContainerImage.fromEcrRepository(repository, "expenso")
            },
            taskSubnets: {
                subnets: [ec2.Subnet.fromSubnetId(this, 'subnet', 'VpcISOLATEDSubnet1Subnet80F07FA0')],
            },
            loadBalancerName: 'application-lb-name',
        });

        loadBalancedFargateService.targetGroup.configureHealthCheck({
           path: '/health'
        });
    }
}

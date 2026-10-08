import * as path from 'path';
import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

/** Python Lambdas whose code lives under service/ at the repo root, one folder per function. */
export class ServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.PYTHON_3_14,
      architecture: lambda.Architecture.ARM_64,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../service/hello_world'), {
        exclude: ['tests', '**/__pycache__'],
      }),
      timeout: cdk.Duration.seconds(10),
      logGroup: new logs.LogGroup(this, 'HelloWorldFunctionLogs', {
        retention: logs.RetentionDays.ONE_MONTH,
      }),
    });
  }
}

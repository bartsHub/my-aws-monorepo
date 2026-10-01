import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { InfrastructureStack } from './infrastructure-stack';

/** Everything the pipeline deploys. Add more stacks here as the project grows. */
export class InfrastructureStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new InfrastructureStack(this, 'InfrastructureStack');
  }
}

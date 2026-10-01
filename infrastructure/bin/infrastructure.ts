#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

/* The pipeline and everything it deploys live in this account and region.
 * For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
const env = { account: '598096477811', region: 'us-east-1' };

new PipelineStack(app, 'InfrastructurePipelineStack', {
  env,
  repo: 'bartsHub/my-aws-monorepo',
  branch: 'main',
  connectionArn: 'arn:aws:codeconnections:us-east-1:598096477811:connection/6a75d8ac-96fc-4ca0-bee5-93123b530eef',
});

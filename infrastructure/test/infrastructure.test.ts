import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import * as Infrastructure from '../lib/infrastructure-stack';
import { ServiceStack } from '../lib/service-stack';

test('Test bucket created with public access blocked', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infrastructure.InfrastructureStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'mike-test-us-east1',
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
});

test('Hello world function runs the Python handler', () => {
  const app = new cdk.App();
  const stack = new ServiceStack(app, 'MyServiceStack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'python3.14',
    Handler: 'handler.handler',
    Architectures: ['arm64'],
  });
  template.hasResourceProperties('AWS::Logs::LogGroup', { RetentionInDays: 30 });
});

import * as cdk from 'aws-cdk-lib/core';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { InfrastructureStage } from './infrastructure-stage';

export interface PipelineStackProps extends cdk.StackProps {
  /** GitHub repository in "owner/name" form. */
  readonly repo: string;
  readonly branch: string;
  /** ARN of the CodeConnections connection authorized for the GitHub account. */
  readonly connectionArn: string;
}

/**
 * Self-mutating CDK pipeline: on every push to the branch it synthesizes the app
 * from infrastructure/, updates itself, then deploys InfrastructureStage.
 */
export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'InfrastructurePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(props.repo, props.branch, {
          connectionArn: props.connectionArn,
        }),
        commands: ['cd infrastructure', 'npm ci', 'npm test', 'npx cdk synth'],
        primaryOutputDirectory: 'infrastructure/cdk.out',
      }),
      codeBuildDefaults: {
        buildEnvironment: { buildImage: codebuild.LinuxBuildImage.STANDARD_7_0 },
        partialBuildSpec: codebuild.BuildSpec.fromObject({
          phases: { install: { 'runtime-versions': { nodejs: 22 } } },
        }),
      },
    });

    pipeline.addStage(new InfrastructureStage(this, 'Prod', { env: props.env }));
  }
}

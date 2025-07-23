import * as core from '@actions/core';
import * as github from '@actions/github';
import { GitHubHandler } from './github-handler';
import { CodeReviewConfig } from './types';

async function run(): Promise<void> {
  try {
    // Get inputs from GitHub Actions
    const claudeApiKey = core.getInput('claude-api-key', { required: true });
    const model = core.getInput('model') || 'claude-3-5-sonnet-20241022';
    const systemPrompt = core.getInput('system-prompt') || undefined;

    const config: CodeReviewConfig = {
      claudeApiKey,
      model,
      systemPrompt,
    };

    const handler = new GitHubHandler(config);

    // Determine the event type and handle accordingly
    const eventName = github.context.eventName;
    
    if (eventName === 'pull_request' || eventName === 'pull_request_target') {
      await handler.handlePullRequest();
    } else if (eventName === 'issue_comment') {
      await handler.handleComment();
    } else {
      core.setFailed(`Unsupported event type: ${eventName}`);
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    core.setFailed(errorMessage);
  }
}

// Export for testing
export { GitHubHandler } from './github-handler';
export { ClaudeClient } from './claude-client';
export * from './types';

// Run the action if this file is executed directly
if (require.main === module) {
  run();
}

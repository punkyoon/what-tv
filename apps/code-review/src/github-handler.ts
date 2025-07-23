import * as core from '@actions/core';
import * as github from '@actions/github';
import { ClaudeClient } from './claude-client';
import { CodeReviewConfig, PullRequestFile, GitHubComment } from './types';

export class GitHubHandler {
  private octokit: ReturnType<typeof github.getOctokit>;
  private claudeClient: ClaudeClient;

  constructor(config: CodeReviewConfig) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    this.octokit = github.getOctokit(token);
    this.claudeClient = new ClaudeClient(config);
  }

  async handlePullRequest(): Promise<void> {
    const context = github.context;
    
    if (!context.payload.pull_request) {
      throw new Error('This action can only be run on pull request events');
    }

    const pr = context.payload.pull_request;
    const { owner, repo } = context.repo;

    try {
      // Get pull request files
      const filesResponse = await this.octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: pr.number,
      });

      const files: PullRequestFile[] = filesResponse.data.map(file => ({
        filename: file.filename,
        status: file.status as 'added' | 'modified' | 'removed',
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch,
      }));

      // Perform code review
      const reviewResult = await this.claudeClient.reviewCode(
        files,
        pr.title,
        pr.body || ''
      );

      // Create review comments
      const comments: GitHubComment[] = [];
      
      // Add summary comment
      let summaryBody = `## 🤖 Code Review by TV\n\n${reviewResult.summary}`;
      
      if (reviewResult.issues.length > 0) {
        summaryBody += '\n\n### Issues Found:\n';
        reviewResult.issues.forEach((issue, index) => {
          const emoji = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          summaryBody += `\n${index + 1}. ${emoji} **${issue.file}**`;
          if (issue.line) {
            summaryBody += ` (Line ${issue.line})`;
          }
          summaryBody += `\n   ${issue.message}`;
          if (issue.suggestion) {
            summaryBody += `\n   💡 Suggestion: ${issue.suggestion}`;
          }
          summaryBody += '\n';
        });
      }

      if (reviewResult.approved) {
        summaryBody += '\n\n✅ **TV** - This pull request looks good to merge!';
      } else {
        summaryBody += '\n\n❌ Please address the issues above before merging.';
      }

      // Create the review
      await this.octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number: pr.number,
        body: summaryBody,
        event: reviewResult.approved ? 'APPROVE' : 'REQUEST_CHANGES',
      });

      // Set outputs
      core.setOutput('approved', reviewResult.approved.toString());
      core.setOutput('issues_count', reviewResult.issues.length.toString());
      core.setOutput('summary', reviewResult.summary);

      if (reviewResult.approved) {
        core.info('✅ Pull request approved by TV');
      } else {
        core.warning(`❌ Pull request needs changes (${reviewResult.issues.length} issues found)`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      core.setFailed(`Code review failed: ${errorMessage}`);
      throw error;
    }
  }

  async handleComment(): Promise<void> {
    const context = github.context;
    
    if (!context.payload.issue?.pull_request) {
      core.info('Comment is not on a pull request, skipping');
      return;
    }

    const comment = context.payload.comment;
    if (!comment?.body?.includes('What TV?')) {
      core.info('Comment does not contain "What TV?", skipping');
      return;
    }

    // Get the pull request
    const { owner, repo } = context.repo;
    const prResponse = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: context.payload.issue.number,
    });

    const pr = prResponse.data;

    // Trigger the same review process as for pull request events
    const filesResponse = await this.octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pr.number,
    });

    const files: PullRequestFile[] = filesResponse.data.map(file => ({
      filename: file.filename,
      status: file.status as 'added' | 'modified' | 'removed',
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch,
    }));

    const reviewResult = await this.claudeClient.reviewCode(
      files,
      pr.title,
      pr.body || ''
    );

    // Reply to the comment
    let replyBody = `## 🤖 TV Review Response\n\n${reviewResult.summary}`;
    
    if (reviewResult.approved) {
      replyBody += '\n\n✅ **TV** - This pull request looks good to merge!';
      
      // Also approve the PR
      await this.octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number: pr.number,
        body: '✅ **TV** - Approved via comment trigger',
        event: 'APPROVE',
      });
    } else {
      replyBody += '\n\n❌ Issues found that need to be addressed.';
    }

    await this.octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: context.payload.issue.number,
      body: replyBody,
    });
  }
}

import * as core from '@actions/core';
import * as github from '@actions/github';

// Supported TV brands
const SUPPORTED_TVS = ['samsung', 'lg', 'sony', 'panasonic'] as const;
type TVBrand = (typeof SUPPORTED_TVS)[number];

// Mock TV image URLs - replace with actual URLs later
const TV_IMAGES: Record<TVBrand, string> = {
  samsung: 'https://example.com/tv/samsung.png', // TODO: Replace with actual image URL
  lg: 'https://example.com/tv/lg.png', // TODO: Replace with actual image URL
  sony: 'https://example.com/tv/sony.png', // TODO: Replace with actual image URL
  panasonic: 'https://example.com/tv/panasonic.png', // TODO: Replace with actual image URL
};

// TV brand display names
const TV_NAMES: Record<TVBrand, string> = {
  samsung: 'Samsung',
  lg: 'LG',
  sony: 'Sony',
  panasonic: 'Panasonic',
};

function parseTVCommand(commentBody: string, defaultTV: string): TVBrand | null {
  const trimmed = commentBody.trim();

  // Match /tv or /tv <brand>
  const match = trimmed.match(/^\/tv(?:\s+(\S+))?$/i);

  if (!match) {
    return null;
  }

  const requestedTV = match[1]?.toLowerCase() || defaultTV.toLowerCase();

  if (SUPPORTED_TVS.includes(requestedTV as TVBrand)) {
    return requestedTV as TVBrand;
  }

  return null;
}

function generateReviewComment(tvBrand: TVBrand): string {
  const tvName = TV_NAMES[tvBrand];
  const tvImage = TV_IMAGES[tvBrand];

  return `## 📺 ${tvName} TV Review

![${tvName} TV](${tvImage})

This PR has been reviewed and approved by **${tvName} TV**! 🎉

---
*Powered by what-tv*`;
}

async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', { required: true });
    const commentBody = core.getInput('comment-body', { required: true });
    const prNumber = parseInt(core.getInput('pr-number', { required: true }), 10);
    const defaultTV = core.getInput('default-tv') || 'samsung';

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info(`Processing comment: ${commentBody}`);
    core.info(`Default TV: ${defaultTV}`);

    // Parse the /tv command
    const tvBrand = parseTVCommand(commentBody, defaultTV);

    if (!tvBrand) {
      const supportedList = SUPPORTED_TVS.join(', ');
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: `❌ Invalid TV brand. Supported brands: ${supportedList}`,
      });
      core.setFailed(`Invalid TV brand in command: ${commentBody}`);
      return;
    }

    core.info(`Selected TV brand: ${tvBrand}`);

    // Create review comment with TV image
    const reviewComment = generateReviewComment(tvBrand);

    await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number: prNumber,
      body: reviewComment,
      event: 'APPROVE',
    });

    core.info(`PR #${prNumber} approved with ${TV_NAMES[tvBrand]} TV review!`);
    core.setOutput('tv-brand', tvBrand);
    core.setOutput('approved', 'true');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unexpected error occurred');
    }
  }
}

run();

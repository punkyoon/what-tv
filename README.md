# What TV? - AI Code Review System

A modern TypeScript project built with Turborepo that provides AI-powered code reviews using Claude API. The system automatically reviews pull requests and provides approval with the signature "TV" message.

## Features

- 🤖 **AI-Powered Code Review**: Uses Claude API for intelligent code analysis
- 🔄 **Automatic PR Review**: Triggers on pull request events
- 💬 **Manual Trigger**: Comment "What TV?" on any PR to trigger a review
- ⚙️ **Configurable**: Customizable Claude model and system prompts
- 📝 **Detailed Feedback**: Provides structured feedback with severity levels
- ✅ **Auto-Approval**: Automatically approves PRs when no issues are found

## Project Structure

This is a Turborepo monorepo with the following packages:

- `apps/web` - Next.js web application
- `apps/docs` - Documentation site
- `packages/ui` - Shared UI components
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration
- `packages/code-review` - Core code review logic and GitHub Action

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure GitHub Secrets

In your GitHub repository, add the following secrets:

- `WHAT_TV_CLAUDE_API_KEY`: Your Claude API key from Anthropic

### 3. Configure the Workflow

The GitHub Actions workflow is located at `.github/workflows/tv-code-review.yml`. You can customize:

1. **Claude Model**: Choose from available models:
   - `claude-3-5-sonnet-20241022` (default)
   - `claude-3-5-haiku-20241022`
   - `claude-3-opus-20240229`

2. **System Prompt**: Override the default system prompt for custom review criteria

### 4. Enable the Workflow

The workflow will automatically trigger on:
- Pull request events (opened, synchronize, reopened)
- Comments containing "What TV?"

## Usage

### Automatic Review

When you create or update a pull request, the TV code review system will automatically:

1. Analyze all changed files
2. Identify potential issues (bugs, security, performance, code quality)
3. Provide structured feedback
4. Approve the PR if no significant issues are found
5. Leave a review comment with "TV" signature

### Manual Review

Comment "What TV?" on any pull request to trigger a manual review.

### Example Review Output

```markdown
## 🤖 Code Review by TV

The code changes look good overall. The implementation follows TypeScript best practices and the logic is sound.

### Issues Found:

1. ❌ **src/utils/helper.ts** (Line 15)
   Missing error handling for async operation
   💡 Suggestion: Add try-catch block around the async call

2. ⚠️ **src/components/Button.tsx**
   Consider using semantic HTML elements for better accessibility
   💡 Suggestion: Add proper ARIA labels

✅ **TV** - This pull request looks good to merge!
```

## Development

### Build the Project

```bash
npm run build
```

### Run Development Server

```bash
npm run dev
```

### Lint Code

```bash
npm run lint
```

### Type Check

```bash
npm run check-types
```

## Configuration Options

### Workflow Inputs

You can customize the workflow behavior by modifying the workflow file or using workflow dispatch:

```yaml
with:
  claude-api-key: ${{ secrets.WHAT_TV_CLAUDE_API_KEY }}
  model: 'claude-3-5-sonnet-20241022'
  system-prompt: |
    You are a senior code reviewer focusing on security and performance.
    Be strict about potential vulnerabilities and suggest optimizations.
```

### Custom System Prompt

The default system prompt focuses on:
- Bug detection
- Security issues
- Performance problems
- Code quality and best practices
- Architecture and design patterns

You can override this with your own criteria by setting the `system-prompt` input.

## Dependencies

All dependencies use minor version pinning (e.g., `^1.2` instead of `^1.2.5`) for better stability.

### Core Dependencies

- `@anthropic-ai/sdk` - Claude API client
- `@actions/core` - GitHub Actions toolkit
- `@actions/github` - GitHub API integration
- `@octokit/rest` - GitHub REST API client

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Wait for TV to review your code! 🤖

## License

MIT License - see LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

---

**TV** - Your AI code review assistant 🤖✨

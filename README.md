# What TV? - AI Code Review Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-What%20TV%3F-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4n3EX8DyzAQ3ggHAd+hc/hRBkmRQRkSqg0pd7t+4e7u7g7u7u5qfYnoiAlTk+zx5xtP7+ct1gN3eWazHHhxOBHBHenTlU9acgUiez4fzrYFdDrGQjRwOiqUbwkRPADeAGsAiD1hBmBHRSRgZuNiccKRHTDkmKVVrQeUSQwrdQkfFZxHdCjG8SA0PVKZSUAAAABJRU5ErkJggg==)](https://github.com/marketplace/actions/what-tv-ai-code-review)

A powerful AI-powered code review GitHub Action that uses Claude API to automatically review pull requests and provide intelligent feedback with the signature "TV" approval.

## ✨ Features

- 🤖 **AI-Powered Reviews**: Uses Anthropic's Claude API for intelligent code analysis
- 🔄 **Automatic PR Review**: Triggers on pull request events automatically
- 💬 **Manual Trigger**: Comment "What TV?" on any PR to trigger a review
- ⚙️ **Configurable**: Customizable Claude model and system prompts
- 📝 **Detailed Feedback**: Provides structured feedback with severity levels
- ✅ **Auto-Approval**: Automatically approves PRs when no issues are found
- 🎯 **Smart Analysis**: Focuses on bugs, security, performance, and code quality

## 🚀 Quick Start

### 1. Add to Your Workflow

Create `.github/workflows/code-review.yml` in your repository:

```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]
  issue_comment:
    types: [created]

jobs:
  code-review:
    if: github.event_name == 'pull_request' || (github.event_name == 'issue_comment' && contains(github.event.comment.body, 'What TV?'))
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        
      - name: Review PR
        uses: "punkyoon/what-tv@v0.0.1"
        with:
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
          model: claude-3-5-sonnet-20241022
          system-prompt: |
            You are a senior code reviewer. Focus on:
            - Security vulnerabilities
            - Performance issues
            - Code quality and best practices
            - Potential bugs
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Configure Secrets

In your GitHub repository settings, add these secrets:

- `CLAUDE_API_KEY`: Your Claude API key from [Anthropic Console](https://console.anthropic.com/)
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

### 3. That's it! 🎉

Your AI code reviewer is now active and will:
- Automatically review new pull requests
- Respond to "What TV?" comments with manual reviews
- Provide detailed feedback and approve when appropriate

## 📋 Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `claude-api-key` | Claude API key for authentication | ✅ Yes | - |
| `model` | Claude model to use | ❌ No | `claude-3-5-sonnet-20241022` |
| `system-prompt` | Custom system prompt for reviews | ❌ No | Built-in prompt |

## 📤 Outputs

| Output | Description |
|--------|-------------|
| `approved` | Whether the pull request was approved |
| `issues_count` | Number of issues found |
| `summary` | Summary of the code review |

## 🎛️ Available Models

- `claude-3-5-sonnet-20241022` (default) - Best balance of speed and quality
- `claude-3-5-haiku-20241022` - Fastest, good for simple reviews
- `claude-3-opus-20240229` - Most thorough, slower but highest quality

## 🔧 Advanced Configuration

### Custom System Prompt

```yaml
- name: Review PR
  uses: "punkyoon/what-tv@v0.0.1"
  with:
    claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
    model: claude-3-5-sonnet-20241022
    system-prompt: |
      You are a security-focused code reviewer. Prioritize:
      1. Security vulnerabilities (SQL injection, XSS, etc.)
      2. Authentication and authorization issues
      3. Data validation problems
      4. Cryptographic implementations
      Be strict about security but constructive in feedback.
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Multiple Triggers

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
  issue_comment:
    types: [created]
  workflow_dispatch: # Manual trigger
```

## 📝 Example Review Output

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

### Summary:
- 2 issues found (1 error, 1 warning)
- Focus areas: Error handling, Accessibility
- Overall code quality: Good

✅ **TV** - This pull request looks good to merge after addressing the error handling issue!
```

## 🛠️ Development

This action is built with:
- TypeScript
- Node.js 20
- Anthropic Claude API
- GitHub Actions Toolkit

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Wait for TV to review your code! 🤖

## 💡 Tips

- **API Costs**: Claude API usage is pay-per-use. Monitor your usage in the Anthropic Console
- **Rate Limits**: The action respects Claude API rate limits automatically
- **Large PRs**: For very large PRs, consider using `claude-3-5-haiku-20241022` for faster reviews
- **Custom Prompts**: Tailor the system prompt to your team's coding standards and priorities

## 🆘 Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/punkyoon/what-tv/issues)
2. Verify your Claude API key is valid
3. Ensure `GITHUB_TOKEN` has proper permissions
4. Review the action logs for detailed error messages

---

**TV** - Your AI code review assistant 🤖✨

*Made with ❤️ for better code quality*

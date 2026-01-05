# TV PR Review Action

A GitHub Action that reviews and approves PRs with TV-themed comments and images.

## Usage

Add a comment on any PR with the `/tv` command:

```
/tv           # Uses default TV (samsung or configured default)
/tv samsung   # Samsung TV review
/tv lg        # LG TV review
/tv sony      # Sony TV review
/tv panasonic # Panasonic TV review
```

## Supported TV Brands

| Brand | Command |
|-------|---------|
| Samsung | `/tv samsung` |
| LG | `/tv lg` |
| Sony | `/tv sony` |
| Panasonic | `/tv panasonic` |

## Configuration

### Setting Default TV Brand

You can configure the default TV brand by setting a repository variable:

1. Go to your repository **Settings**
2. Navigate to **Secrets and variables** > **Actions**
3. Click on **Variables** tab
4. Add a new variable:
   - Name: `DEFAULT_TV_NAME`
   - Value: One of `samsung`, `lg`, `sony`, `panasonic`

If not configured, the default is `samsung`.

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `github-token` | GitHub token for API access | Yes | - |
| `comment-body` | The comment body that triggered the action | Yes | - |
| `pr-number` | The PR number to review | Yes | - |
| `default-tv` | Default TV brand | No | `samsung` |

## Outputs

| Output | Description |
|--------|-------------|
| `tv-brand` | The TV brand used for the review |
| `approved` | Whether the PR was approved |

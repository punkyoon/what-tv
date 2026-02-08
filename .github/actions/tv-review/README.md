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

## Development

### Prerequisites

- Node.js v24 (LTS)
- npm

### Setup

```bash
cd .github/actions/tv-review
npm install
```

### Build

After modifying the source code, you must build to update `dist/index.js`:

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

### Project Structure

```
.github/actions/tv-review/
├── src/
│   └── index.ts      # Main source code
├── dist/
│   └── index.js      # Bundled output (must be committed)
├── action.yml        # Action definition
├── package.json
└── tsconfig.json
```

## Release

### 1. Modify Code

Make your changes in `src/index.ts`.

### 2. Build

```bash
cd .github/actions/tv-review
npm run build
```

### 3. Commit and Push

```bash
git add .
git commit -m "feat: update tv-review action"
git push
```

### Changing TV Image URLs

Update the image URLs in the `TV_IMAGES` object in `src/index.ts`:

```typescript
const TV_IMAGES: Record<TVBrand, string> = {
  samsung: 'https://your-domain.com/samsung.png',
  lg: 'https://your-domain.com/lg.png',
  sony: 'https://your-domain.com/sony.png',
  panasonic: 'https://your-domain.com/panasonic.png',
};
```

After modifying, run `npm run build` and commit `dist/index.js`.

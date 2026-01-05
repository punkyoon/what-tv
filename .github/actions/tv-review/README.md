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

소스 코드 수정 후 반드시 빌드하여 `dist/index.js`를 업데이트해야 합니다:

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
│   └── index.ts      # 메인 소스 코드
├── dist/
│   └── index.js      # 빌드된 번들 (커밋 필요)
├── action.yml        # Action 정의
├── package.json
└── tsconfig.json
```

## Release

### 1. 코드 수정

`src/index.ts`에서 필요한 수정을 진행합니다.

### 2. 빌드

```bash
cd .github/actions/tv-review
npm run build
```

### 3. 커밋 및 푸시

```bash
git add .
git commit -m "feat: update tv-review action"
git push
```

### TV 이미지 URL 변경

`src/index.ts`의 `TV_IMAGES` 객체에서 이미지 URL을 수정합니다:

```typescript
const TV_IMAGES: Record<TVBrand, string> = {
  samsung: 'https://your-domain.com/samsung.png',
  lg: 'https://your-domain.com/lg.png',
  sony: 'https://your-domain.com/sony.png',
  panasonic: 'https://your-domain.com/panasonic.png',
};
```

수정 후 `npm run build`를 실행하고 `dist/index.js`를 커밋하세요.

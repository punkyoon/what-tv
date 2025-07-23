# GitHub Marketplace Setup Guide

This document provides step-by-step instructions for publishing the "What TV?" GitHub Action to the GitHub Marketplace.

## 📋 Prerequisites

Before publishing to the marketplace, ensure you have:

1. ✅ **action.yml** in the root directory
2. ✅ **dist/index.js** bundled file in the root directory
3. ✅ **README.md** with proper documentation
4. ✅ **LICENSE** file
5. ✅ All dependencies bundled (no external dependencies required)

## 🚀 Publishing Steps

### 1. Create a Release

1. Go to your GitHub repository: `https://github.com/punkyoon/what-tv`
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. Set the tag version (e.g., `v0.0.1`)
5. Set the release title: "What TV? - AI Code Review v0.0.1"
6. Add release notes describing the features
7. Click "Publish release"

### 2. Submit to Marketplace

1. After creating the release, GitHub will automatically detect the action
2. Go to the "Actions" tab in your repository
3. You should see a banner asking if you want to publish to the marketplace
4. Click "Draft a release" or "Publish this Action to the GitHub Marketplace"
5. Fill out the marketplace form:
   - **Primary Category**: Code Quality
   - **Secondary Category**: Continuous Integration
   - **Description**: Use the description from action.yml
   - **Icon**: check-circle (already set in action.yml)
   - **Color**: green (already set in action.yml)

### 3. Marketplace Review

- GitHub will review your action (usually takes 1-2 business days)
- They check for security, quality, and compliance
- Once approved, your action will be live on the marketplace

## 📝 Usage Instructions for Users

Once published, users can use your action like this:

```yaml
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

## 🔧 Development Workflow

### Building the Action

To rebuild the action after making changes:

```bash
# Build and bundle the action
npm run build-action

# Or manually:
cd apps/code-review
npm run build
npx @vercel/ncc build dist/index.js -o ../../dist --source-map --license ../../dist/licenses.txt
```

### Testing Locally

Before publishing updates:

1. Test the action in a test repository
2. Create a workflow file that uses the action locally
3. Verify all inputs and outputs work correctly
4. Check that error handling works properly

## 📁 File Structure

```
what-tv/
├── action.yml              # Action definition (REQUIRED)
├── dist/                   # Bundled code (REQUIRED)
│   ├── index.js           # Main bundled file
│   ├── index.js.map       # Source map
│   ├── licenses.txt       # License information
│   └── sourcemap-register.js
├── README.md              # Documentation (REQUIRED)
├── LICENSE                # License file (REQUIRED)
├── apps/code-review/      # Source code
│   ├── src/
│   ├── package.json
│   └── dist/             # TypeScript build output
└── ...
```

## 🏷️ Versioning

Follow semantic versioning:
- `v1.0.0` - Major release
- `v1.1.0` - Minor release (new features)
- `v1.0.1` - Patch release (bug fixes)

Users can reference:
- `punkyoon/what-tv@v1` - Latest v1.x.x
- `punkyoon/what-tv@v1.0.1` - Specific version
- `punkyoon/what-tv@main` - Latest commit (not recommended for production)

## 🔒 Security Considerations

- Never commit API keys or secrets
- All dependencies are bundled to prevent supply chain attacks
- The action only requires `GITHUB_TOKEN` and `CLAUDE_API_KEY`
- No network requests except to Claude API and GitHub API

## 📊 Marketplace Analytics

After publishing, you can track:
- Download/usage statistics
- User feedback and ratings
- Issue reports and feature requests

## 🆘 Troubleshooting

Common issues:
1. **Action not found**: Ensure the release is published and public
2. **Permission errors**: Check that `GITHUB_TOKEN` has proper permissions
3. **API errors**: Verify `CLAUDE_API_KEY` is valid and has credits
4. **Bundle errors**: Rebuild with `npm run build-action`

## 📞 Support

For issues with the action:
1. Check the [GitHub Issues](https://github.com/punkyoon/what-tv/issues)
2. Review the action logs in the workflow run
3. Verify all required secrets are set
4. Test with a minimal workflow first

---

**Ready to publish?** Follow the steps above to get your AI code reviewer on the GitHub Marketplace! 🚀

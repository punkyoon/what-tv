"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeClient = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const DEFAULT_SYSTEM_PROMPT = `
You are an expert code reviewer. Your task is to review code changes in a pull request and provide constructive feedback.

Please analyze the provided code changes and:
1. Identify potential bugs, security issues, or performance problems
2. Check for code quality issues (readability, maintainability, best practices)
3. Suggest improvements where appropriate
4. Consider the overall architecture and design patterns

Respond with a JSON object in the following format:
{
  "approved": boolean,
  "issues": [
    {
      "file": "filename",
      "line": number (optional),
      "severity": "error" | "warning" | "info",
      "message": "description of the issue",
      "suggestion": "suggested fix (optional)"
    }
  ],
  "summary": "Overall summary of the review"
}

If there are no significant issues, set "approved" to true and provide an empty issues array.
Focus on being helpful and constructive rather than overly critical.`.trim();
class ClaudeClient {
    constructor(config) {
        this.config = config;
        this.client = new sdk_1.default({
            apiKey: config.claudeApiKey,
        });
    }
    async reviewCode(files, prTitle, prDescription) {
        const systemPrompt = this.config.systemPrompt || DEFAULT_SYSTEM_PROMPT;
        const filesContent = files
            .filter(file => file.patch && file.status !== 'removed')
            .map(file => {
            return `
          ## File: ${file.filename}
          Status: ${file.status}
          Changes: +${file.additions} -${file.deletions}

          \`\`\`diff
          ${file.patch}
          \`\`\`
        `.trim();
        })
            .join('\n');
        const userPrompt = `
      Please review the following pull request:

      **Title:** ${prTitle}
      **Description:** ${prDescription}

      **Files Changed:**
      ${filesContent}

      Please provide your code review in the specified JSON format.
    `.trim();
        try {
            const response = await this.client.messages.create({
                model: this.config.model,
                max_tokens: 4000,
                system: systemPrompt,
                messages: [
                    { role: 'user', content: userPrompt, },
                ],
            });
            const content = response.content[0];
            if (!content || content.type !== 'text') {
                throw new Error('Unexpected response type from Claude API');
            }
            // Extract JSON from the response
            const jsonMatch = content.text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in Claude response');
            }
            const result = JSON.parse(jsonMatch[0]);
            // Validate the response structure
            if (typeof result.approved !== 'boolean' || !Array.isArray(result.issues) || typeof result.summary !== 'string') {
                throw new Error('Invalid response structure from Claude API');
            }
            return result;
        }
        catch (err) {
            console.error('Error calling Claude API:', err);
            throw new Error(`Failed to get code review from Claude: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    }
}
exports.ClaudeClient = ClaudeClient;

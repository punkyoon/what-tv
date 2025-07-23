import { CodeReviewConfig, PullRequestFile, CodeReviewResult } from './types';
export declare class ClaudeClient {
    private client;
    private config;
    constructor(config: CodeReviewConfig);
    reviewCode(files: PullRequestFile[], prTitle: string, prDescription: string): Promise<CodeReviewResult>;
}
//# sourceMappingURL=claude-client.d.ts.map
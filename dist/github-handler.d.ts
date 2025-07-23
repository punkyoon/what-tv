import { CodeReviewConfig } from './types';
export declare class GitHubHandler {
    private octokit;
    private claudeClient;
    constructor(config: CodeReviewConfig);
    handlePullRequest(): Promise<void>;
    handleComment(): Promise<void>;
}
//# sourceMappingURL=github-handler.d.ts.map
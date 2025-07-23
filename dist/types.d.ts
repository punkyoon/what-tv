export interface CodeReviewConfig {
    claudeApiKey: string;
    model: string;
    systemPrompt?: string;
}
export interface PullRequestFile {
    filename: string;
    status: 'added' | 'modified' | 'removed';
    additions: number;
    deletions: number;
    changes: number;
    patch?: string;
}
export interface CodeReviewResult {
    approved: boolean;
    issues: CodeReviewIssue[];
    summary: string;
}
export interface CodeReviewIssue {
    file: string;
    line?: number;
    severity: 'error' | 'warning' | 'info';
    message: string;
    suggestion?: string;
}
export interface GitHubComment {
    body: string;
    path?: string;
    line?: number;
    side?: 'LEFT' | 'RIGHT';
}
//# sourceMappingURL=types.d.ts.map
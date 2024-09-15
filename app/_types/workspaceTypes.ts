export type WorkspaceType = {
    name: string;
    workspaceEmoji: string;
    description: string;
}

export type WorkspaceFormData = {
} & WorkspaceType;

export type BasePaginatedWorkspaces = {
    page: number;
    limit: number;
    query: string;
}

export type PaginatedWorkspace = Pick<BasePaginatedWorkspaces, 'page' | 'query'>;
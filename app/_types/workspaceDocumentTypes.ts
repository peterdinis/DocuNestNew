export type WorkspaceDocumentType = {
    name: string;
    content: string;
    workspaceId: string;
};

export type UpdateWorkspaceDocumentType = Partial<WorkspaceDocumentType>;

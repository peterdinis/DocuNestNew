import axios from "axios";

export const fetchAllWorkspaceDocumentsForWorkspace = async (id: string) => {
    const request = await axios.get(`/api/workspaces/${id}/documents`);
    if (!id) {
        throw new Error('Workspace with this id not found');
    }

    return request.data;
};

export const fetchAllDocuments = async() => {
    const request = await axios.get("/api/documents");
    return request.data;
}


export const fetchWorkspaceDocument = async(id: string) => {
    const request = await axios.get(`/api/documents/${id}`);
    if (!id) {
        throw new Error('Workspace document with this id not found');
    }

    return request.data;
}
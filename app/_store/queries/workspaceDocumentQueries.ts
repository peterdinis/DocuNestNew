import axios from "axios";

export const fetchAllWorkspaceDocumentsForWorkspace = async (id: string) => {
    const request = await axios.get(`/api/workspaces/${id}/documents`);
    if (!id) {
        throw new Error('Workspace with this id not found');
    }

    return request.data;
};

import axios from 'axios';

export const fetchAllWorkspaceMessages = async (id: string) => {
    const request = await axios.get(`/api/workspaces/${id}/messages`);
    if (!id) {
        throw new Error('Workspace with this id not found');
    }

    return request.data;
};

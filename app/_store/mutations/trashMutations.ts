import axios from 'axios';

export const moveWorkspaceToTrash = async (id: string) => {
    return await axios.put(`/api/workspaces/${id}/trash`);
};

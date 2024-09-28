import axios from 'axios';

export const moveWorkspaceToTrash = async (id: string) => {
    return await axios.put(`/api/workspaces/${id}/trash`);
};

export const cleanTrash = async () => {
    return await axios.delete('/api/trash/clear');
};

export const restoreWorkspaceFromTrash = async (id: string) => {
    return await axios.put(`/api/workspaces/${id}/restore`);
};

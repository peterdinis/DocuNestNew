import { WorkspaceDocumentType } from '@/app/_types/workspaceDocumentTypes';
import axios from 'axios';

export const newDocumentWorkspace = async (data: WorkspaceDocumentType) => {
    return await axios.post('/api/documents/create', data);
};

export const deleteWorkspaceDocument = async (id: string) => {
    const request = await axios.delete(`/api/documents/${id}`);
    if (!id) {
        throw new Error('Workspace document with this id not found');
    }

    return request.data;
};

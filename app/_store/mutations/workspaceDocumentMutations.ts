import { WorkspaceDocumentType } from '@/app/_types/workspaceDocumentTypes';
import axios from 'axios';

export const newDocumentWorkspace = async (data: WorkspaceDocumentType) => {
    return await axios.post('/api/documents/create', data);
};

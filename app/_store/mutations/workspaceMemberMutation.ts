import { WorkspaceMemberType } from '@/app/_types/workspaceTypes';
import axios from 'axios';

export const addNewMemberToWorkspace = async (data: WorkspaceMemberType) => {
    return await axios.post('/api/workspaces/add-member');
};

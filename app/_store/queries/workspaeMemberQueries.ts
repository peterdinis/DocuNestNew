import axios from 'axios';

export const allMyMemberWorkspaces = async (page = 1, limit = 10) => {
    const response = await axios.get(`/api/workspaces/member?page=${page}&limit=${limit}`);
    return response.data;
};
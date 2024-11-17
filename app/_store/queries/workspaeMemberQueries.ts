import axios from "axios";

export const allMyMemberWorkspaces = async (page = 1, limit = 10) => {
	const response = await axios.get(
		`/api/workspaces/member?page=${page}&limit=${limit}`,
	);
	return response.data;
};

export const fetchAllWorkspaceMembersForWorkspace = async (id: string) => {
	const request = await axios.get(`/api/workspaces/${id}/members`);
	if (!id) {
		throw new Error("Workspace with this id not found");
	}

	return request.data;
};

export const findMemberInWorkspace = async () => {
	const request = await axios.get(`/api/permissions/`);
	return request.data;
};

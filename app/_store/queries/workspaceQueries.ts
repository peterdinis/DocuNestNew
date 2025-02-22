import type { PaginatedWorkspace } from "@/app/_types/workspaceTypes";
import axios from "axios";

export const getAllWorkspaces = async () => {
	const request = await axios.get("/api/workspaces");
	return request.data;
};

export const fetchAllPaginatedWorkspaces = async (
	pagintedType: PaginatedWorkspace,
) => {
	const request = await axios.get("/api/workspaces/paginated", {
		params: {
			query: pagintedType.query,
			page: pagintedType.page,
		},
	});

	return request.data;
};

export const fetchAllWorkspaces = async () => {
	const request = await axios.get("/api/workspaces");
	return request.data;
};

export const fetchLatestsWorkspaces = async () => {
	const request = await axios.get("/api/workspaces/latests");
	return request.data;
};

export const fetchWorkspaceDetail = async (id: string) => {
	const request = await axios.get(`/api/workspaces/${id}`);
	if (!id) {
		throw new Error("Workspace with this id not found");
	}

	return request.data;
};

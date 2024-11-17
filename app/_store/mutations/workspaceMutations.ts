import type {
	UpdateWorkspaceType,
	WorkspaceType,
} from "@/app/_types/workspaceTypes";
import axios from "axios";

export const createWorkspace = async (data: WorkspaceType) => {
	const request = await axios.post("/api/workspaces/new", data);
	return request.data;
};

export const updateWorkspace = async (
	id: string,
	data: UpdateWorkspaceType,
) => {
	const request = await axios.put(`/api/workspaces/${id}`, data);
	return request.data;
};

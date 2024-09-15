import { WorkspaceType } from "@/app/_types/workspaceTypes";
import axios from "axios";

export const createWorkspace = async (data: WorkspaceType) => {
    const request = await axios.post("/api/workspaces/new", data);
    return request.data;
}
import axios from "axios";

export const getAllWorkspaces = async() => {
    const request = await axios.get("/api/workspaces");
    return request.data;
}
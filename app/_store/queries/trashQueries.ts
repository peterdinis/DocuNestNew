import axios from "axios";

export const allTrashWorkspaces = async () => {
    const request = await axios.get("/api/trash");
    return request.data;
}
import axios from "axios";

export const allMyMemberWorkspaces = async () => {
    return await axios.get("/api/workspaces/member");
}
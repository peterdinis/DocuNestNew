import axios from "axios";

export const allUploadedDocuments = async () => {
    return await axios.get("/api/uploaded-documents");
}
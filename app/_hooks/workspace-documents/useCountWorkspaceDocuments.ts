"use client"

import { fetchAllDocuments } from "@/app/_store/queries/workspaceDocumentQueries"
import { useQuery } from "@tanstack/react-query"

const useAllCountedWorkspaceDocuments = () => {
    return useQuery({
        queryKey: ["workspaceCountedDocuments"],
        queryFn: async() => {
            return await fetchAllDocuments();
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })
}

export default useAllCountedWorkspaceDocuments
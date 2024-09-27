"use client"

import { useQuery } from "@tanstack/react-query"
import { allTrashWorkspaces } from "@/app/_store/queries/trashQueries"

const useAllTrashWorkspaces = () => {
    return useQuery({
        queryKey: ['trashWorkspaces'],
        queryFn: () => allTrashWorkspaces(),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}

export default useAllTrashWorkspaces
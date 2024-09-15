"use client"

import { useQuery} from "@tanstack/react-query"
import { fetchLatestsWorkspaces } from "@/app/_store/queries/workspaceQueries"

const useDisplayLatestsWorkspaces = () => {
    return useQuery({
        queryKey: ['latestWorkspaces'],
        queryFn: () => fetchLatestsWorkspaces(),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })
}

export default useDisplayLatestsWorkspaces;
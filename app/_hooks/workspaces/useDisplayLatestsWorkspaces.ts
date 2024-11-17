"use client";

import { fetchLatestsWorkspaces } from "@/app/_store/queries/workspaceQueries";
import { useQuery } from "@tanstack/react-query";

const useDisplayLatestsWorkspaces = () => {
	return useQuery({
		queryKey: ["latestWorkspaces"],
		queryFn: () => fetchLatestsWorkspaces(),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useDisplayLatestsWorkspaces;

"use client";

import { fetchAllWorkspaces } from "@/app/_store/queries/workspaceQueries";
import { useQuery } from "@tanstack/react-query";

const useDisplayAllWorkspaces = () => {
	return useQuery({
		queryKey: ["allWorkspaces"],
		queryFn: () => fetchAllWorkspaces(),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});
};

export default useDisplayAllWorkspaces;
